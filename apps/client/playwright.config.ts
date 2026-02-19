import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:5173",
    headless: !!process.env.CI,
  },
  webServer: {
    command: "bun dev",
  },
});
