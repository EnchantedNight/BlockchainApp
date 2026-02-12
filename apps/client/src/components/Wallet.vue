<script setup lang="ts">
import { useTonConnect } from "../composables/tonConnect";
import { CHAIN } from "@tonconnect/sdk";

const { account, connected } = useTonConnect();
</script>

<template>
  <div>
    <div v-if="connected">
      <div
        :style="{
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
        }"
      >
        <h2>Wallet - {{ account.address }}</h2>
        <h2>
          {{
            account.chain == CHAIN.MAINNET
              ? "mainnet"
              : account.chain == CHAIN.TESTNET
                ? "testnet"
                : undefined
          }}
        </h2>
        <h2></h2>
      </div>
    </div>
    <div
      v-else
      :style="{
        fontFamily: 'monospace',
        fontSize: '15px',
        margin: '5px',
        marginTop: '15px',
        fontWeight: 'bold',
      }"
    >
      Wallet not connected!
    </div>
  </div>
</template>
