import { defineConfig } from "vite";
import plugins from "./plugins";

export default defineConfig({
  plugins: plugins,
  server: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  },
});
