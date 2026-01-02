import { db } from "../firebase";
import type { Route } from "./+types/orders";
import styles from "./orders.module.css";
import { CheckmarkIcon } from "@navikt/aksel-icons";
import { Form } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  const ordersRef = db.collection("orders");

  const snapshot = await ordersRef.get();

  const orders = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      product: data.product,
    };
  });

  return orders;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const ordersRef = db.collection("orders");

  if (request.method === "DELETE") {
    const id = formData.get("id");
    await ordersRef.doc(`${id}`).delete();
  }

  const snapshot = await ordersRef.get();

  const orders = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      product: data.product,
    };
  });

  return orders;
}

export default function Orders({ loaderData }: Route.ComponentProps) {
  const orders = loaderData;

  return (
    <>
      <h1 className={styles.title}>Ordre</h1>
      <ul>
        {orders.map((order) => {
          return (
            <li key={order.id} className={styles.order}>
              <Form method="DELETE" className={styles.form}>
                <div className={styles.wrapper}>
                  <span>{order.name}</span>
                  <span className={styles.description}>{order.product}</span>
                </div>
                <input type="hidden" name="id" defaultValue={order.id} />
                <button type="submit" className={styles.button}>
                  <CheckmarkIcon fontSize="1.5rem" />
                </button>
              </Form>
            </li>
          );
        })}
      </ul>
    </>
  );
}
