import { computed } from "vue";
import tonConnectUI from "../tonClient";

export const useTonConnect = () => {
  const tonConnectRef = computed(() => tonConnectUI);
  return {
    wallet: tonConnectRef.value.wallet,
    account: tonConnectRef.value.account,
    connected: tonConnectRef.value.connected,
  };
};
