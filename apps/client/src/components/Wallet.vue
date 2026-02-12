<script setup lang="ts">
import { useTonConnect } from "../composables/tonConnect";
import { CHAIN } from "@tonconnect/sdk";

// const { account, connected } = useTonConnect();
const address = "UQBbRjXvoc5j2KLVtrOgGgr1XIQgc0e6B1UwRpIg-qNdOerG";
const connected = true;
const chain = CHAIN.MAINNET;
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
        <h2>Wallet - {{ address }}</h2>
        <!-- account.address -->
        <h2>
          {{
            chain == CHAIN.MAINNET
              ? // account.chain
                "mainnet"
              : chain == CHAIN.TESTNET
                ? // account.chain
                  "testnet"
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
