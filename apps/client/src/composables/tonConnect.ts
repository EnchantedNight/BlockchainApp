import { ref, type Ref } from "vue";
import type { Wallet, Account, ITonConnect } from "@tonconnect/ui";
import tonConnectUI from "../tonClient";

const wallet = ref(tonConnectUI.wallet);
const connected = ref(tonConnectUI.connected);
const account = ref(tonConnectUI.account);
const connector = ref(tonConnectUI.connector);
const address = ref(tonConnectUI.account?.address);

tonConnectUI.onStatusChange((newWallet) => {
  wallet.value = newWallet;
  connected.value = tonConnectUI.connected;
  account.value = tonConnectUI.account;
  connector.value = tonConnectUI.connector;
  address.value = tonConnectUI.account?.address;
});

export const useTonConnect = () => {
  return {
    wallet: wallet as Ref<Wallet | null>,
    connected: connected as Ref<boolean>,
    account: account as Ref<Account | null>,
    connector: connector as Ref<ITonConnect>,
    address: address as Ref<string | undefined>,
  };
};

/*
import type { Wallet, Account, ITonConnect } from "@tonconnect/ui";
import tonConnectUI from "../tonClient";

type ConnectedState = {
  connected: Ref<true>;
  wallet: Ref<Wallet>;
  account: Ref<Account>;
  address: Ref<string>;
  connector: Ref<ITonConnect>;
};

type DisconnectedState = {
  connected: Ref<false>;
  wallet: Ref<null>;
  account: Ref<null>;
  address: Ref<null>;
  // Based on your requirement "other vars null",
  // connector is also null here. If your connector persists
  // even when disconnected, change this to Ref<ITonConnect>.
  connector: Ref<null>;
};

// Define the discriminated union here (or import it)
type UseTonConnect =
  | {
      connected: Ref<true>;
      wallet: Ref<Wallet>;
      account: Ref<Account>;
      address: Ref<string>;
      connector: Ref<ITonConnect>;
    }
  | {
      connected: Ref<false>;
      wallet: Ref<null>;
      account: Ref<null>;
      address: Ref<null>;
      connector: Ref<null>;
    };

const wallet = ref(tonConnectUI.wallet);
const connected = ref(tonConnectUI.connected);
const account = ref(tonConnectUI.account);
const connector = ref(tonConnectUI.connector);
const address = ref(tonConnectUI.account?.address);

tonConnectUI.onStatusChange((newWallet) => {
  wallet.value = newWallet;
  connected.value = tonConnectUI.connected;
  account.value = tonConnectUI.account;
  connector.value = tonConnectUI.connector;
  address.value = tonConnectUI.account!!.address;
});

export const useTonConnect = (): UseTonConnect => {
  // We cast to 'UseTonConnect' because the individual refs
  // are defined as `Ref<Wallet | null>` initially,
  // but the Union expects `Ref<Wallet>` in the connected branch.
  return {
    wallet,
    connected,
    account,
    connector,
    address,
  } as UseTonConnect;
};
*/
