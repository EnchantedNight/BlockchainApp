<script setup lang="ts">
import { CHAIN } from "@tonconnect/sdk";
import { useTonConnect } from "../composables/tonConnect";
import { ref } from "vue";
import { Address, beginCell } from "@ton/core";

const { account, connector, connected } = useTonConnect();
const isHovered = ref(false);

const sendTransaction = async () => {
  if (!account.value) {
    console.error("Account not connected");
    return;
  }

  const rawAddress = Address.parseRaw(account.value.address).toString({
    urlSafe: false,
    bounceable: true,
    testOnly: true, // For testnet
  });

  const payload = beginCell().storeStringTail("TonMonorepo Tx").endCell();

  const transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 300,
    network: CHAIN.TESTNET,
    from: rawAddress,
    messages: [
      {
        address: rawAddress,
        amount: "50000000",
        payload: payload.toBoc().toString("base64"),
      },
    ],
  };

  try {
    await connector.value.sendTransaction(transaction);
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
    v-if="connected"
    @click="sendTransaction"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <span>Send funds!</span>
  </div>
</template>
