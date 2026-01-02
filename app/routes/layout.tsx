import { Form, Outlet } from "react-router";
import clsx from "clsx/lite";
import styles from "./layout.module.css";
import { Context } from "../context";
import { useEffect, useState } from "react";

export default function Layout() {
  const state = useState<Array<string>>([]);
  const [navn, setNavn] = useState<string>("");

  useEffect(() => {
    setNavn(window.localStorage.getItem("navn") ?? "");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("navn", navn);
  }, [navn]);

  return (
    <Context.Provider value={state}>
      <header>Chezmoi</header>
      <main>
        <Outlet />
      </main>
      <footer
        className={clsx(
          styles.footer,
          state[0].length > 0 ? styles.visible : null,
        )}
      >
        <Form method="POST" className={styles.wrapper}>
          <input
            placeholder="Ditt navn..."
            className={styles.input}
            value={navn}
            onChange={(e) => setNavn(e.target.value)}
            name="name"
          />
          <input
            type="hidden"
            name="products"
            defaultValue={[...new Set(state[0])]}
          />
          <button type="submit" className={styles.button}>
            Bestill
          </button>
        </Form>
      </footer>
    </Context.Provider>
  );
}
