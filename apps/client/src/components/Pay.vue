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

const transaction = {
  validUntil: Math.floor(Date.now() / 1000) + 300,
  network: CHAIN.TESTNET,
  from: account.value.address,
  messages: [
    {
      address: account.value.address,
      amount: "10000000",
      payload: "TonMonorepo Tx",
    },
  ],
};

console.log(connected);

const isHovered = ref(false);
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
    }"
    v-if="connected"
    @click="
      async () => {
        await connector.sendTransaction(transaction);
      }
    "
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    Send funds!
  </div>
</template>
