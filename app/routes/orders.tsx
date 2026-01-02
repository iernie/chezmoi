import type { Route } from "./+types/orders";
import styles from "./orders.module.css";
import { CheckmarkIcon } from "@navikt/aksel-icons";

export async function loader({ params }: Route.LoaderArgs) {
  const product = [
    { id: 1, name: "Ola", product: "Margherita" },
    { id: 2, name: "Kari", product: "Carbonara" },
  ];
  return product;
}

export default function Orders({ loaderData }: Route.ComponentProps) {
  const orders = loaderData;
  return (
    <>
      <h1 className={styles.title}>Orders</h1>
      <ul>
        {orders.map((order) => {
          return (
            <li key={order.id} className={styles.order}>
              <div className={styles.wrapper}>
                <span>{order.product}</span>
                <span className={styles.description}>{order.name}</span>
              </div>
              <button className={styles.button}>
                <CheckmarkIcon fontSize="1.5rem" />
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
