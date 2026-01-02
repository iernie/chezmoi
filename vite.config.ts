import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig(({}) => {
  return {
    ssr: {
      external: ["firebase-admin"],
    },
    plugins: [reactRouter()],
  };
});
