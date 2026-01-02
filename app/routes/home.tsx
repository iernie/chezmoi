import { useStateProvider } from "~/context";
import type { Route } from "./+types/home";
import styles from "./home.module.css";
import { MinusIcon, PlusIcon } from "@navikt/aksel-icons";
import React from "react";

export async function loader({ params }: Route.LoaderArgs) {
  const product = [
    {
      id: 1,
      title: "Margherita",
      description: "Tomatsaus, Mozzarella, Basilikum",
      category: "Pizza",
    },
    { id: 2, title: "Pistaccio", category: "Pizza" },
    { id: 3, title: "Carbonara", category: "Pasta" },
    { id: 4, title: "Al limone", category: "Pasta" },
  ];
  return product.reduce(
    (acc, curr) => {
      return { ...acc, [curr.category]: [...(acc[curr.category] ?? []), curr] };
    },
    {} as { [key: string]: Array<(typeof product)[0]> },
  );
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const categories = loaderData;
  const [state, setState] = useStateProvider();
  return (
    <>
      {Object.entries(categories).map(([category, products]) => {
        return (
          <React.Fragment key={category}>
            <h1 className={styles.title}>{category}</h1>
            <ul>
              {products.map((product) => {
                return (
                  <li key={product.id} className={styles.product}>
                    <div className={styles.wrapper}>
                      <span>{product.title}</span>
                      {product.description && (
                        <span className={styles.description}>
                          {product.description}
                        </span>
                      )}
                    </div>
                    <div className={styles.buttonwrapper}>
                      {state.includes(product.id) && (
                        <button
                          className={styles.button}
                          onClick={() =>
                            setState((prev) =>
                              prev.filter((p) => p !== product.id),
                            )
                          }
                        >
                          <MinusIcon fontSize="1.5rem" />
                        </button>
                      )}
                      {state.includes(product.id) &&
                        state.filter((p) => p === product.id).length}

                      <button
                        disabled={state.includes(product.id)}
                        className={styles.button}
                        onClick={() =>
                          setState((prev) => [...prev, product.id])
                        }
                      >
                        <PlusIcon fontSize="1.5rem" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </React.Fragment>
        );
      })}
    </>
  );
}
