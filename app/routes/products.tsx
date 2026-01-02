import { FloppydiskIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import type { Route } from "./+types/products";
import styles from "./products.module.css";
import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { db } from "../firebase";
import { Form, useFetcher } from "react-router";

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
  const productsRef = db.collection("products");

  if (request.method === "POST") {
    const id = crypto.randomUUID();
    const category = formData.get("category");
    await productsRef.doc(id).set({
      id: id,
      name: "",
      description: "",
      category: category,
    });
  }

  if (request.method === "PATCH") {
    const originalCategory = formData.get("originalCategory");
    const category = formData.get("category");
    if (!!originalCategory) {
      await productsRef
        .where("category", "==", originalCategory)
        .get()
        .then((snap) =>
          snap.forEach((s) =>
            s.ref.update({
              category: category,
            }),
          ),
        );
    }

    const id = formData.get("id");
    if (!!id) {
      const name = formData.get("name");
      const description = formData.get("description");
      await productsRef.doc(`${id}`).update({
        name: name,
        description: description,
      });
    }
  }

  if (request.method === "DELETE") {
    const category = formData.get("category");
    if (!!category) {
      await productsRef
        .where("category", "==", category)
        .get()
        .then((snap) => snap.forEach((s) => s.ref.delete()));
    }

    const id = formData.get("id");
    if (!!id) {
      await productsRef.doc(`${id}`).delete();
    }
  }

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

export default function Products({ loaderData }: Route.ComponentProps) {
  const categories = loaderData;

  const fetcher = useFetcher();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      formRef.current?.reset();
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <>
      <h1 className={styles.title}>Produkter</h1>
      {Object.entries(categories).map(([category, products]) => {
        return (
          <React.Fragment key={category}>
            <Form method="PATCH" className={styles.category}>
              <input
                className={clsx(styles.title, styles.input)}
                defaultValue={category}
                name="category"
              />
              <input
                type="hidden"
                defaultValue={category}
                name="originalCategory"
              />
              <button type="submit" className={styles.button}>
                <FloppydiskIcon fontSize="1.5rem" />
              </button>
              <button
                type="submit"
                formMethod="DELETE"
                className={styles.button}
              >
                <TrashIcon fontSize="1.5rem" />
              </button>
            </Form>
            <ul>
              {products.map((product) => {
                return (
                  <li key={product.id} className={styles.product}>
                    <Form method="PATCH" className={styles.form}>
                      <input
                        type="hidden"
                        defaultValue={product.id}
                        name="id"
                      />
                      <div className={styles.wrapper}>
                        <input
                          placeholder="Navn..."
                          className={styles.input}
                          defaultValue={product.name}
                          name="name"
                        />
                        <textarea
                          placeholder="Beskrivelse..."
                          className={styles.input}
                          defaultValue={product.description}
                          name="description"
                        />
                      </div>
                      <button type="submit" className={styles.button}>
                        <FloppydiskIcon fontSize="1.5rem" />
                      </button>
                      <button
                        type="submit"
                        formMethod="DELETE"
                        className={styles.button}
                      >
                        <TrashIcon fontSize="1.5rem" />
                      </button>
                    </Form>
                  </li>
                );
              })}
              <Form method="POST">
                <button type="submit" className={styles.button}>
                  <PlusIcon fontSize="1.5rem" />
                </button>
                <input type="hidden" defaultValue={category} name="category" />
              </Form>
            </ul>
          </React.Fragment>
        );
      })}

      <fetcher.Form method="POST" className={styles.category} ref={formRef}>
        <input
          placeholder="Kategorinavn..."
          className={clsx(styles.title, styles.input)}
          type="text"
          name="category"
        />
        <button className={styles.button} type="submit">
          <PlusIcon fontSize="1.5rem" />
        </button>
      </fetcher.Form>
    </>
  );
}
