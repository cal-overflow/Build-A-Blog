<template>
  <main>
    <nav-bar current-page="Home" />
    <Home />
  </main>
</template>

<script>
import Home from '@/components/Home.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  // eslint-disable-next-line vue/component-definition-name-casing
  name: 'index',
  components: {
    Home,
    NavBar
  },
};
</script>
