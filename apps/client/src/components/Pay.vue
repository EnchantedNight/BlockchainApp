<script setup lang="ts">
import { CHAIN } from "@tonconnect/sdk";
import { useTonConnect } from "src/composables/tonConnect";

const { wallet, connector, connected } = useTonConnect();

const transaction = {
  validUntil: Math.floor(Date.now() / 1000) + 300,
  network: CHAIN.TESTNET,
  from: wallet.value.account.address,
  messages: [
    {
      address: wallet.value.account.address,
      amount: "10000000",
      payload: "TonMonorepo Tx",
    },
  ],
};
</script>

<template>
  <div
    v-if="connected"
    @click="
      async () => {
        await connector.sendTransaction(transaction);
      }
    "
  >
    Send funds!
  </div>
</template>
