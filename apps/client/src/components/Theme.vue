<script setup>
onMounted(() => {
  const tg = window.Telegram.WebApp;
  tg.ready();
  const isDark = tg.colorScheme === "dark";
  document.body.style.setProperty(
    "--app-text-color",
    isDark ? "#FFFFFF" : "#000000",
  );
  document.body.style.setProperty(
    "--app-bg-color",
    isDark ? "#000000" : "#FFFFFF",
  );
  tg.onEvent("themeChanged", () => {
    const newIsDark = tg.colorScheme === "dark";
    document.body.style.setProperty(
      "--app-text-color",
      newIsDark ? "#FFFFFF" : "#000000",
    );
    document.body.style.setProperty(
      "--app-bg-color",
      newIsDark ? "#000000" : "#FFFFFF",
    );
  });
});
</script>

<style>
body {
  color: var(--app-text-color, black);
  background: var(--app-bg-color, white);
}
</style>
