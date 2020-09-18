<template>
  <div id="app" class="container mx-auto">
    <Main />
    <notifications group="gif" position="top center" classes="border-gray-700 shadow-outline text-gray-900" />
  </div>
</template>

<script>
import Main from "./components/Main";
export default {
  name: "App",
  components: {
    Main,
  },
};
</script>

<style></style>
