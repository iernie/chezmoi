import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/", "routes/home.tsx"),
    route("thanks", "routes/thanks.tsx"),
    route("admin/orders", "routes/orders.tsx"),
    route("admin/products", "routes/products.tsx"),
  ]),
] satisfies RouteConfig;
