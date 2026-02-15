<script setup lang="ts">
import { CHAIN } from "@tonconnect/sdk";
import { useTonConnect } from "../composables/tonConnect";
import { ref } from "vue";

const { account, connector, connected } = useTonConnect();

// const account = {
//   value: {
//     address: "",
//   },
// };

// const connector = {
//   sendTransaction: async (ts: any) => {},
// };

const isHovered = ref(false);

const sendTransaction = async () => {
  if (!account.value) {
    console.error("Account not connected");
    return;
  }

  const transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 300,
    network: CHAIN.TESTNET,
    from: account.value.address,
    messages: [
      {
        address: account.value.address,
        amount: "50000000",
        payload: btoa("TonMonorepo Tx"),
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
      padding: '5px',
      borderStyle: 'solid',
      fontFamily: 'monospace',
      fontWeight: 'bold',
      fontSize: '15px',
      maxWidth: '105px',
      borderRadius: '15px',
      transition: 'all 0.2s ease',
      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      backgroundColor: 'black',
      color: 'white',
      boxSizing: 'border-box',
    }"
    v-if="connected"
    @click="sendTransaction"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    Send funds!
  </div>
</template>
