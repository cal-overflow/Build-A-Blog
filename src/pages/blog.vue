<template>
  <main>
    <nav-bar current-page="Blog" />
    <post-feed title="Blog"/>
    <back-to-top-button />
    <footer-bar current-page="Blog" />
  </main>
</template>

<script>
import NavBar from '@/components/structural/NavBar.vue';
import PostFeed from '@/components/views/PostFeed.vue';
import FooterBar from '@/components/structural/FooterBar.vue';
import BackToTopButton from '@/components/helpers/BackToTopButton.vue';

export default {
  name: 'blog',
  components: {
    NavBar,
    PostFeed,
    BackToTopButton,
    FooterBar
  },
};
</script>
