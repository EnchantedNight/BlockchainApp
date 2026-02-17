<script setup lang="ts">
import Connect from "./components/Connect.vue";
import Wallet from "./components/Wallet.vue";
import Pay from "./components/Pay.vue";

onMounted(() => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.expand();
    window.Telegram.WebApp.disableVerticalSwipes();
    window.Telegram.WebApp.ready();

    window.Telegram.WebApp.onEvent("viewportChanged", () => {
      document.documentElement.style.setProperty(
        "--tg-viewport-height",
        `${window.Telegram.WebApp.viewportHeight}px`,
      );
      document.documentElement.style.setProperty(
        "--tg-viewport-stable-height",
        `${window.Telegram.WebApp.viewportStableHeight}px`,
      );
    });
  }
});
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
        <Pay />
      </div>
    </div>
  </div>
</template>
