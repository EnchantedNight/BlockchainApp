import { Tonkeeper as BaseTonkeeper } from "@tonconnect/qa";

export class Tonkeeper extends BaseTonkeeper {
  override async connect(confirm?: boolean) {
    console.log("Tonkeeper: Waiting for connect page...");
    const acceptPage = await this.context.waitForEvent("page");
    console.log("Tonkeeper: Connect page opened, clicking 'Connect wallet'...");
    await acceptPage.getByRole("button", { name: "Connect wallet" }).click();

    const unlockInput = acceptPage.locator("#unlock-password");
    try {
      // WAIT for React to render the password input instead of instantly checking visibility
      await unlockInput.waitFor({ state: "visible", timeout: 3000 });
      console.log("Tonkeeper: Filling password...");
      await unlockInput.fill(this.password);
    } catch (e) {
      // No password prompt appeared, continue safely
    }

    if (confirm !== false) {
      console.log("Tonkeeper: Clicking 'Confirm'...");
      const confirmButton = acceptPage.getByRole("button", { name: "Confirm" });
      try {
        await confirmButton.waitFor({ state: "visible", timeout: 3000 });
        await confirmButton.click();
      } catch (e) {}
    } else {
      console.log("Tonkeeper: Clicking 'Cancel'...");
      await acceptPage.getByRole("button", { name: "Cancel" }).click();
    }
  }

  override async accept(confirm?: boolean, timeout = 30000) {
    console.log("Tonkeeper: Waiting for transaction confirmation page...");
    const acceptPage = await this.context.waitForEvent("page", { timeout });
    console.log(
      "Tonkeeper: Confirmation page opened, waiting for 'Confirm' button...",
    );

    const confirmButton = acceptPage.getByRole("button", { name: "Confirm" });
    await confirmButton.waitFor({ state: "visible" });
    console.log("Tonkeeper: Clicking 'Confirm'...");
    await confirmButton.click();

    const unlockInput = acceptPage.locator("#unlock-password");
    try {
      // WAIT for React to render the password input!
      await unlockInput.waitFor({ state: "visible", timeout: 3000 });
      console.log("Tonkeeper: Filling password...");
      await unlockInput.fill(this.password);

      if (confirm !== false) {
        console.log("Tonkeeper: Clicking final 'Confirm'...");
        await confirmButton.click();
      } else {
        console.log("Tonkeeper: Clicking 'Cancel'...");
        await acceptPage.getByRole("button", { name: "Cancel" }).click();
      }
    } catch (e) {
      console.log("Tonkeeper: No password required or already processing.");
    }

    // Wait for the popup to close itself as proof the transaction actually submitted
    try {
      await acceptPage.waitForEvent("close", { timeout: 10000 });
    } catch (e) {}
  }
}
