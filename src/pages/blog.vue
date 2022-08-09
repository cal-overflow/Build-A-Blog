<template>
  <main>
    <nav-bar current-page="Blog" />
    <blog-feed />
    <back-to-top-button />
    <footer-bar current-page="Blog" />
  </main>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import BlogFeed from '@/components/BlogFeed.vue';
import FooterBar from '@/components/FooterBar.vue';
import BackToTopButton from '@/components/BackToTopButton.vue';

export default {
  name: 'blog',
  components: {
    NavBar,
    BlogFeed,
    BackToTopButton,
    FooterBar
  },
};
</script>
