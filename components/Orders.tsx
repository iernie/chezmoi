"use client";

import { Tables } from "@/database.types";
import styles from "./Orders.module.css";
import { finishOrder } from "@/app/actions";

type IProps = {
  orders: Array<Tables<"orders"> & { products: Tables<"products"> }> | null;
  finishOrder: typeof finishOrder;
};

const Orders = ({ orders, finishOrder }: IProps) => {
  return (
    <>
      <h2>Orders</h2>
      {orders?.map((order) => {
        return (
          <article key={order.id} className={styles.order}>
            <section>
              <h2 className={styles.product}>{order.products.name}</h2>
              <p className={styles.customer}>{order.customer}</p>
            </section>
            <section>
              <button
                className={styles.finish}
                onClick={() => finishOrder(order.id)}
              >
                -
              </button>
            </section>
          </article>
        );
      })}
    </>
  );
};

export default Orders;
