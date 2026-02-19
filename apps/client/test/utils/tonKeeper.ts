import { Tonkeeper as BaseTonkeeper } from "@tonconnect/qa";

export class Tonkeeper extends BaseTonkeeper {
  override async connect(confirm?: boolean) {
    console.log("Tonkeeper: Waiting for connect page...");
    const acceptPage = await this.context.waitForEvent("page");
    console.log("Tonkeeper: Connect page opened, clicking 'Connect wallet'...");
    await acceptPage.getByRole("button", { name: "Connect wallet" }).click();

    const unlockInput = acceptPage.locator("#unlock-password");
    if (await unlockInput.isVisible()) {
      console.log("Tonkeeper: Filling password...");
      await unlockInput.fill(this.password);
    }

    if (confirm !== false) {
      console.log("Tonkeeper: Clicking 'Confirm'...");
      const confirmButton = acceptPage.getByRole("button", { name: "Confirm" });
      if (await confirmButton.isVisible()) {
        await confirmButton.click();
      }
    } else {
      console.log("Tonkeeper: Clicking 'Cancel'...");
      await acceptPage.getByRole("button", { name: "Cancel" }).click();
    }
  }

  override async accept(confirm?: boolean, timeout = 300000) {
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
    if (await unlockInput.isVisible()) {
      console.log("Tonkeeper: Filling password...");
      await unlockInput.fill(this.password);
    }

    if (confirm !== false) {
      console.log("Tonkeeper: Clicking final 'Confirm'...");
      const finalConfirmButton = acceptPage.getByRole("button", {
        name: "Confirm",
      });
      if (await finalConfirmButton.isVisible()) {
        await finalConfirmButton.click();
      }
    } else {
      console.log("Tonkeeper: Clicking 'Cancel'...");
      await acceptPage.getByRole("button", { name: "Cancel" }).click();
    }
  }
}
