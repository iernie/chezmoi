import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("admin/orders", "routes/orders.tsx"),
    route("admin/products", "routes/products.tsx"),
  ]),
] satisfies RouteConfig;
