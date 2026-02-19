<script setup lang="ts">
import { CHAIN } from "@tonconnect/sdk";
import { beginCell } from "@ton/core";
import { WalletUtils } from "@utils/wallet";

import tonConnectUI from "../tonClient";

const { account, connected, address } = useTonConnect();
const isHovered = ref(false);

const sendTransaction = async () => {
  if (!account.value) {
    console.error("Account not connected");
    return;
  }

  const rawAddress = WalletUtils.parseRawAddress(address.value!!);

  const payload = beginCell().storeStringTail("TonMonorepo Tx").endCell();

  const transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 300,
    network: CHAIN.TESTNET,
    messages: [
      {
        address: rawAddress,
        amount: "50000000",
        payload: payload.toBoc().toString("base64"),
      },
    ],
  };

  try {
    await tonConnectUI.sendTransaction(transaction);
  } catch (e) {
    console.error("Transaction failed", e);
    throw new Error("Error sending tx!");
  }
};
</script>

<template>
  <div
    :style="{
      margin: '10px',
      marginLeft: '0px',
      borderColor: '#fff',
      borderWidth: '2px',
      padding: '10px',
      borderStyle: 'solid',
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '15px',
      borderRadius: '20px',
      transition: 'all 0.2s ease',
      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      backgroundColor: 'white',
      color: 'black',
      boxSizing: 'border-box',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      letterSpacing: '-0.01em',
      maxWidth: 'fit-content',
      userSelect: 'none',
    }"
    id="sendFundsButton"
    v-if="connected"
    @click="sendTransaction"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <span>Send funds!</span>
  </div>
</template>
