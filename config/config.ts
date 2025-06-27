import { defineConfig } from "umi";
import { routes } from "./routes";

export default defineConfig({
  publicPath: '/umi-three-demo/', // 仓库名称
  base: '/umi-three-demo/',       // 路由前缀
  routes: routes,
  plugins: ["@umijs/plugins/dist/react-query"],
  reactQuery: { devtool: false },
  npmClient: "pnpm",
});
