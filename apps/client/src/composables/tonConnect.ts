import { Account, ITonConnect, Wallet } from "@tonconnect/sdk";
import tonConnectUI from "../tonClient";

const wallet = ref(tonConnectUI.wallet);
const connected = ref(tonConnectUI.connected);
const account = ref(tonConnectUI.account);
const connector = ref(tonConnectUI.connector);
const address = ref(tonConnectUI.account.address);

tonConnectUI.onStatusChange((newWallet) => {
  wallet.value = newWallet;
  connected.value = tonConnectUI.connected;
  account.value = tonConnectUI.account;
  connector.value = tonConnectUI.connector;
  address.value = tonConnectUI.account.address;
});

export const useTonConnect = (): {
  wallet: Ref<Wallet>;
  connected: Ref<boolean>;
  account: Ref<Account>;
  connector: Ref<ITonConnect>;
  address: Ref<string>;
  $address: string;
} => {
  return {
    wallet,
    connected,
    account,
    connector,
    address,
    $address: unref(address),
  };
};
