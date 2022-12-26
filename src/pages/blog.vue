<template>
  <main>
    <nav-bar current-page="Blog" />
    <blog-feed />
    <back-to-top-button />
    <footer-bar current-page="Blog" />
  </main>
</template>

<script>
import NavBar from '@/components/structural/NavBar.vue';
import BlogFeed from '@/components/views/BlogFeed.vue';
import FooterBar from '@/components/structural/FooterBar.vue';
import BackToTopButton from '@/components/helpers/BackToTopButton.vue';

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
