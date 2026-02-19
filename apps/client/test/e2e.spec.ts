import { TonConnectWidget, testWith } from "@tonconnect/qa";
import { tonkeeperFixture } from "./utils/fixtures.ts";

const test = testWith(tonkeeperFixture(process.env.WALLET_MNEMONIC!));
const { expect } = test;

test("lab", async ({ context, wallet }) => {
  const app = await context.newPage();

  // 1. INJECT HEADER AT THE PAGE LEVEL ONLY
  // This bypasses Vercel without poisoning the extension's background context!
  const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  if (bypassSecret) {
    await app.setExtraHTTPHeaders({
      "x-vercel-protection-bypass": bypassSecret,
    });
  }

  // 2. NETWORK DEBUGGER (Keep this just in case!)
  app.on("response", (response) => {
    if (response.status() === 403 || response.status() === 401) {
      console.log(`NETWORK BLOCKED (${response.status()}): ${response.url()}`);
    }
  });

  app.on("console", (msg) => {
    if (msg.type() === "error") {
      console.log(`APP ERROR: ${msg.text()}`);
    }
  });

  // 3. Navigate to the clean root URL (the header will authenticate us)
  await app.goto("/");

  const connectButton = app.locator("#connectButton button");

  const tonConnect = new TonConnectWidget(app, connectButton);
  await tonConnect.connectWallet("Tonkeeper");
  await wallet.connect();

  const accountSelector = app.locator("h2").first();
  await expect(accountSelector).toContainText("kQ");

  console.log("Wallet connected, waiting for UI to stabilize...");
  await app.waitForTimeout(5000);

  console.log("Sending funds and waiting for wallet...");
  const sendFundsButton = app.locator("#sendFundsButton");
  await sendFundsButton.waitFor({ state: "visible" });

  let success = false;
  for (let i = 0; i < 3; i++) {
    try {
      console.log(`Click attempt ${i + 1}...`);
      await Promise.all([wallet.accept(true, 10000), sendFundsButton.click()]);
      success = true;
      break;
    } catch (e) {
      console.log(`Click attempt ${i + 1} failed`);
      await app.waitForTimeout(2000);
    }
  }

  if (!success) {
    throw new Error("Failed to send funds after 3 attempts");
  }

  console.log("Transaction accepted!");
});
