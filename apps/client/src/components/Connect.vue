<script setup lang="ts">
import tonConnectUI from "../tonClient";

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
