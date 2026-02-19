import { tonkeeperExtension } from "@tonconnect/qa";
import { test as base, chromium } from "@playwright/test";
import { Tonkeeper } from "./tonKeeper.js";

export const tonkeeperFixture = (mnemonic: string, slowMo = 0) => {
  return base.extend<{ wallet: Tonkeeper }>({
    context: async ({ baseURL }, use) => {
      const tonkeeperPath = await tonkeeperExtension();

      // 1. Launch Chromium directly instead of using the unpatchable library helper
      const context = await chromium.launchPersistentContext("", {
        headless: false, // Force headed mode so the extension actually loads
        args: [
          `--disable-extensions-except=${tonkeeperPath}`,
          `--load-extension=${tonkeeperPath}`,
        ],
        baseURL,
      });

      await use(context);
      await context.close();
    },
    wallet: async ({ context }, use) => {
      // 2. Inline the service worker logic to guarantee the 120s timeout is respected!
      let [background] = context.serviceWorkers();
      context.setDefaultTimeout(300000);
      if (!background) {
        background = await context.waitForEvent("serviceworker", {
          timeout: 120000,
        });
      }

      const extensionId = background.url().split("/")[2];
      const tonkeeper = new Tonkeeper(context, extensionId);

      if (mnemonic) {
        await tonkeeper.importWallet(mnemonic);
      }

      await use(tonkeeper);
    },
  });
};
