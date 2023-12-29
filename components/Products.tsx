"use client";

import { Tables } from "@/database.types";
import styles from "./Products.module.css";
import { addOrder, deleteProduct } from "@/app/actions";
import { useState } from "react";
import clsx from "clsx";
import { User } from "@supabase/supabase-js";

type IProps = {
  products: Array<Tables<"products">> | null;
  deleteProduct: typeof deleteProduct;
  addOrder: typeof addOrder;
  user: User | null;
};

const Products = ({ products, deleteProduct, addOrder, user }: IProps) => {
  const [selected, setSelected] = useState<Tables<"products">>();
  return (
    <>
      {products?.map((product) => {
        return (
          <article
            key={product.id}
            className={clsx(styles.product, {
              [styles.selected]: product.id === selected?.id,
            })}
          >
            <section>
              <h2 className={styles.name}>{product.name}</h2>
              <p className={styles.description}>{product.description}</p>
            </section>
            <section>
              {user && (
                <button
                  className={styles.delete}
                  onClick={() => deleteProduct(product.id)}
                >
                  X
                </button>
              )}
              <button
                className={styles.add}
                onClick={() =>
                  setSelected(product.id !== selected?.id ? product : undefined)
                }
              >
                {product.id !== selected?.id ? "+" : "-"}
              </button>
            </section>
          </article>
        );
      })}
      {selected && (
        <div className={styles.order}>
          <div className={styles.orderwrapper}>
            <p>{selected.name}</p>
            <form action={addOrder}>
              <label>
                Name
                <input name="name" />
              </label>
              <input type="hidden" name="product" value={selected.id} />
              <button type="submit">Legg til</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
