import { TonConnectWidget, testWith } from "@tonconnect/qa";
import { tonkeeperFixture } from "./utils/fixtures.ts";

const test = testWith(tonkeeperFixture(process.env.WALLET_MNEMONIC!));

const { expect } = test;

test("lab", async ({ context, wallet }) => {
  const app = await context.newPage();
  app.on("console", (msg) => {
    if (msg.type() === "error") {
      console.log(`APP ERROR: ${msg.text()}`);
    }
  });

  // Fetch the bypass secret you added to your environment variables
  const bypassToken = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

  // Attach it as a query parameter to force Vercel to issue a bypass cookie
  const targetUrl = bypassToken
    ? `/?x-vercel-protection-bypass=${bypassToken}`
    : "/";

  await app.goto(targetUrl);

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
      console.log(`Click attempt ${i + 1} failed: ${e.message}`);
      await app.waitForTimeout(2000);
    }
  }

  if (!success) {
    throw new Error("Failed to send funds after 3 attempts");
  }

  console.log("Transaction accepted!");
});
