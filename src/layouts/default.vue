<template>
  <Nuxt class="bg-main-light dark:bg-main-dark dark:text-white transition" />
</template>

<script>
export default {
  head() {
    return {
      script: [{ src: 'initializeTheme.js' }],
    };
  }
};
</script>

<style>
html {
  background: #292929;
}
</style>