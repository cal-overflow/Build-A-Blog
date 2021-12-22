<template>
  <main>
    <nav-bar current-page="Home" />
    <Home />
    <Footer current-page="Home" />
  </main>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Home from '@/components/Home.vue';
import Footer from '@/components/Footer.vue';

export default {
  // eslint-disable-next-line vue/component-definition-name-casing
  name: 'index',
  components: {
    NavBar,
    Home,
    Footer,
  },
};
</script>
