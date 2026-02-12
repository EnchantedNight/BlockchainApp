import { ref } from "vue";
import tonConnectUI from "../tonClient";

const wallet = ref(tonConnectUI.wallet);
const connected = ref(tonConnectUI.connected);
const account = ref(tonConnectUI.account);
const connector = ref(tonConnectUI.connector);

tonConnectUI.onStatusChange((newWallet) => {
  wallet.value = newWallet;
  connected.value = tonConnectUI.connected;
  account.value = tonConnectUI.account;
  connector.value = tonConnectUI.connector;
});

export const useTonConnect = () => {
  return {
    wallet,
    connected,
    account,
    connector,
  };
};
