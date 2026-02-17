import vue from "@vitejs/plugin-vue";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import tsconfigPaths from "vite-tsconfig-paths";
import AutoImports from "unplugin-auto-import/vite";

export default [
  vue(),
  nodePolyfills({
    include: ["buffer"],
  }),
  tsconfigPaths(),
  AutoImports({
    imports: ["vue"],
    dirs: ["src/composables"],
    dts: "src/types/auto.d.ts",
    vueTemplate: true,
  }),
];
