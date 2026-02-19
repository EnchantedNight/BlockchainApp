import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./test",
  outputDir: "/tmp/playwright",
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:5173",
    headless: !!process.env.CI,
  },
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "yarn dev",
        url: "http://localhost:5173",
        reuseExistingServer: true,
      },
});
