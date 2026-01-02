import { Outlet } from "react-router";
import clsx from "clsx/lite";
import styles from "./layout.module.css";
import { Context } from "~/context";
import { useEffect, useState } from "react";

export default function Layout() {
  const state = useState<Array<number>>([]);
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
        <div className={styles.wrapper}>
          <input
            placeholder="Ditt navn..."
            className={styles.input}
            value={navn}
            onChange={(e) => setNavn(e.target.value)}
          />
          <button className={styles.button}>Bestill</button>
        </div>
      </footer>
    </Context.Provider>
  );
}
