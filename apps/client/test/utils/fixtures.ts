import {
  tonkeeperExtension,
  launchPersistentContext,
  getExtensionId,
} from "@tonconnect/qa";
import { test as base } from "@playwright/test";
import { Tonkeeper } from "./tonKeeper.js";

export const tonkeeperFixture = (mnemonic: string, slowMo = 0) => {
  return base.extend<{ wallet: Tonkeeper }>({
    context: async ({ context: _, baseURL, headless }, use) => {
      const tonkeeperPath = await tonkeeperExtension();

      // Inject the Vercel Bypass header directly into the browser context
      const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

      const context = await launchPersistentContext(tonkeeperPath, slowMo, {
        baseURL,
        extraHTTPHeaders: bypassSecret
          ? { "x-vercel-protection-bypass": bypassSecret }
          : {},
      });

      await use(context);
      await context.close();
    },
    wallet: async ({ context }, use) => {
      const tonkeeper = new Tonkeeper(context, await getExtensionId(context));
      if (mnemonic) {
        await tonkeeper.importWallet(mnemonic);
      }
      await use(tonkeeper);
      // context is closed by the context fixture
    },
  });
};
