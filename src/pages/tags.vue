<template>
  <main>
    <nav-bar current-page="Tags" />
    <p> COME BACK TO THIS! </p>
    <tag-feed path="tags" />
    <back-to-top-button />
    <footer-bar current-page="Tags" />
  </main>
</template>

<script>
import NavBar from '@/components/structural/NavBar.vue';
import FooterBar from '@/components/structural/FooterBar.vue';
import BackToTopButton from '@/components/helpers/BackToTopButton.vue';
import TagFeed from '@/components/views/TagFeed.vue';

export default {
  name: 'tags',
  components: {
    NavBar,
    BackToTopButton,
    FooterBar,
    TagFeed
  },
};
</script>
