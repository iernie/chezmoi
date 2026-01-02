import { useEffect } from "react";
import type { Route } from "./+types/thanks";
import styles from "./thanks.module.css";
import { Link } from "react-router";
import { useStateProvider } from "../context";

export default function Thanks({}: Route.ComponentProps) {
  const [, setState] = useStateProvider();

  useEffect(() => {
    setState([]);
  }, []);

  return (
    <>
      <h1 className={styles.title}>Takk for din ordre!</h1>
      <Link className={styles.link} to="/">
        Bestill mer
      </Link>
    </>
  );
}
