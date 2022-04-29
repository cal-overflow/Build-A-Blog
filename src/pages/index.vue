<template>
  <main>
    <nav-bar current-page="Home" />
    <home :bio="bio" :portfolio-preview="portfolio" :blog-preview="blog" />
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
  async asyncData({ $content, error }) {
    const content = await $content('general')
      .fetch()
      .catch((err) => {
        error({
          statusCode: 500,
          message: 'Something went wrong while fetching the "about me" content',
          error: err
        });
      });

    return {
      bio: content.find(({ slug }) => slug === 'about'),
      portfolio: content.find(({ slug }) => slug === 'portfolio-preview'),
      blog: content.find(({ slug }) => slug === 'blog-preview')
    };
  }
};
</script>
