<template>
  <main>
    <nav-bar current-page="Blog" />
    <blog-feed />
    <footer-bar current-page="Blog" />
  </main>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import BlogFeed from '@/components/BlogFeed.vue';
import FooterBar from '@/components/FooterBar.vue';

export default {
  name: 'blog',
  components: {
    NavBar,
    BlogFeed,
    FooterBar,
  },
};
</script>