import { THEME, TonConnectUI } from "@tonconnect/ui";

export default new TonConnectUI({
  manifestUrl: `${window.location.origin}/tonconnect-manifest.json`,
  analytics: {
    mode: "off",
  },
  uiPreferences: {
    theme: THEME.LIGHT,
  },
});
