import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/three", component: "ThreeDemo", name: "three" },
    { path: "/", component: "index", name: "home" },
    { path: "/products", component: "products", name: "products" },
  ],
  plugins: ["@umijs/plugins/dist/react-query"],
  reactQuery: { devtool: false },
  npmClient: "pnpm",
});
