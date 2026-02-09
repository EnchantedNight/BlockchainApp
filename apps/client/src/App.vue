<script setup lang="ts">
import Connect from "./components/Connect.vue";
import Wallet from "./components/Wallet.vue";
</script>

<template>
  <div>
    <div>
      <h1
        :style="{
          fontFamily: 'monospace',
        }"
      ></h1>
      <div
        :style="{
          display: 'flex',
          flexDirection: 'column',
          margin: '20px',
          marginTop: '40px',
        }"
      >
        <Connect />
        <Wallet />
      </div>
    </div>
  </div>
</template>
