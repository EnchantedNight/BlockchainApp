import { TonConnectUI } from "@tonconnect/ui";

export default new TonConnectUI({
  manifestUrl:
    "https://blockchain-client-tau.vercel.app/tonconnect-manifest.json",
  analytics: {
    mode: "off",
  },
});
