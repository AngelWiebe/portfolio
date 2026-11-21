import { defineConfig } from "@playwright/test";

const baseURL = "http://127.0.0.1:4173";

export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.pw.mjs",
  workers: 1,
  use: {
    baseURL,
    channel: "chromium",
    locale: "en-US",
    viewport: { width: 1280, height: 900 },
  },
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4173 --strictPort",
    url: baseURL,
  },
});
