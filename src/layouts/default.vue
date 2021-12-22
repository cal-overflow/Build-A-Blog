<template>
  <Nuxt />
</template>

<script>
export default {
  head() {
    return {
      title: 'Christian Lisle',
      meta: [{
        hid: 'description',
        name: 'description',
        content: "Software engineer passionate about personal projects, open source, and all things software.",
      }]
    };
  },
};
</script>

<style>
* {
  font-family: 'Poppins', sans-serif;
}
</style>