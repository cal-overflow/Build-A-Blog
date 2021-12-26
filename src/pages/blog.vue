<template>
  <main>
    <nav-bar current-page="Blog" />
    <blog-feed />
    <Footer current-page="Blog" />
  </main>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import BlogFeed from '@/components/BlogFeed.vue';
import Footer from '@/components/Footer.vue';

export default {
  // eslint-disable-next-line vue/component-definition-name-casing
  name: 'blog',
  components: {
    NavBar,
    BlogFeed,
    Footer,
  },
};
</script>