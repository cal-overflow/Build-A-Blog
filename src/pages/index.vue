<template>
  <main>
    <nav-bar current-page="Home" />
    <home />
    <footer-bar current-page="Home" />
  </main>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Home from '@/components/Home.vue';
import FooterBar from '@/components/FooterBar.vue';

export default {
  name: 'index',
  components: {
    NavBar,
    Home,
    FooterBar,
  },
};
</script>
