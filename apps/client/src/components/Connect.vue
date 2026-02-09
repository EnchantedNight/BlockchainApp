<script setup lang="ts">
import { onMounted } from "vue";
import { useTonConnect } from "../composables/tonConnect";
import tonConnectUI from "../tonClient";

const tonConnect = useTonConnect();

onMounted(() => {
  tonConnectUI.uiOptions = {
    buttonRootId: "connectButton",
  };
});
</script>

<template>
  <div>
    <div id="connectButton"></div>
  </div>
</template>
