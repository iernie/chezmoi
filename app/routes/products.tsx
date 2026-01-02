import { PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import type { Route } from "./+types/products";
import styles from "./products.module.css";
import clsx from "clsx";
import React from "react";

export async function loader({ params }: Route.LoaderArgs) {
  const product = [
    {
      id: 1,
      name: "Martherita",
      description: "Tomatsaus, Mozzarella, Basilikum",
      category: "Pizza",
    },
    { id: 2, name: "Carbonara", category: "Pasta" },
  ];
  return product.reduce(
    (acc, curr) => {
      return { ...acc, [curr.category]: [...(acc[curr.category] ?? []), curr] };
    },
    {} as { [key: string]: Array<(typeof product)[0]> },
  );
}

export default function Products({ loaderData }: Route.ComponentProps) {
  const categories = loaderData;
  return (
    <>
      <h1 className={styles.title}>Products</h1>
      {Object.entries(categories).map(([category, products]) => {
        return (
          <React.Fragment key={category}>
            <div className={styles.category}>
              <input
                className={clsx(styles.title, styles.input)}
                value={category}
              />
              <button className={styles.button}>
                <TrashIcon fontSize="1.5rem" />
              </button>
            </div>
            <ul>
              {products.map((product) => {
                return (
                  <li key={product.id} className={styles.product}>
                    <div className={styles.wrapper}>
                      <input
                        placeholder="Name..."
                        className={styles.input}
                        value={product.name}
                      />
                      <textarea
                        placeholder="Description..."
                        className={styles.input}
                        value={product.description}
                      />
                    </div>
                    <button className={styles.button}>
                      <TrashIcon fontSize="1.5rem" />
                    </button>
                  </li>
                );
              })}
              <button className={styles.button}>
                <PlusIcon fontSize="1.5rem" />
              </button>
            </ul>
          </React.Fragment>
        );
      })}
      <div className={styles.category}>
        <input
          placeholder="New category..."
          className={clsx(styles.title, styles.input)}
          value={""}
        />
        <button className={styles.button}>
          <PlusIcon fontSize="1.5rem" />
        </button>
      </div>
    </>
  );
}
