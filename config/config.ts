import { defineConfig } from "umi";
import { routes } from "./routes";

export default defineConfig({
  routes: routes,
  plugins: ["@umijs/plugins/dist/react-query"],
  reactQuery: { devtool: false },
  npmClient: "pnpm",
});
