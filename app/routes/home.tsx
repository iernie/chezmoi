import { useStateProvider } from "../context";
import type { Route } from "./+types/home";
import styles from "./home.module.css";
import { MinusIcon, PlusIcon } from "@navikt/aksel-icons";
import React from "react";
import { db } from "../firebase";
import { redirect } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  const productsRef = db.collection("products");

  const snapshot = await productsRef.get();

  const products = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      description: data.description,
      category: data.category,
    };
  });

  return products.reduce(
    (acc, curr) => {
      return { ...acc, [curr.category]: [...(acc[curr.category] ?? []), curr] };
    },
    {} as { [key: string]: Array<(typeof products)[0]> },
  );
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const ordersRef = db.collection("orders");

  const name = formData.get("name");
  const products = formData.get("products");
  (products?.toString() ?? "").split(",").forEach(async (product) => {
    const id = crypto.randomUUID();
    await ordersRef.doc(id).set({
      id: id,
      name: name,
      product: product,
    });
  });

  return redirect("/thanks");
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
                      <span>{product.name}</span>
                      {product.description && (
                        <span className={styles.description}>
                          {product.description}
                        </span>
                      )}
                    </div>
                    <div className={styles.buttonwrapper}>
                      {state.includes(product.name) && (
                        <button
                          className={styles.button}
                          onClick={() =>
                            setState((prev) =>
                              prev.filter((p) => p !== product.name),
                            )
                          }
                        >
                          <MinusIcon fontSize="1.5rem" />
                        </button>
                      )}
                      {state.includes(product.name) &&
                        state.filter((p) => p === product.name).length}

                      <button
                        disabled={state.includes(product.name)}
                        className={styles.button}
                        onClick={() =>
                          setState((prev) => [...prev, product.name])
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
