<template>
  <main>
    <nav-bar current-page="Home" />
    <home :about="aboutContent" />
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
    const aboutContent = await $content('about')
      .fetch()
      .catch((err) => {
        error({
          statusCode: 500,
          message: 'Something went wrong',
          error: err
        });
      });

    return {
      aboutContent
    };
  }
};
</script>
