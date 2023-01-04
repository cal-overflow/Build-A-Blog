<template>
  <main>
    <nav-bar current-page="Blog" />
    <post-view :route="$router.history.current.path" />
    <back-to-top-button />
    <footer-bar current-page="Blog" />
  </main>
</template>

<script>
import NavBar from '@/components/structural/NavBar.vue';
import BackToTopButton from '@/components/helpers/BackToTopButton.vue';
import FooterBar from '@/components/structural/FooterBar.vue';
import PostView from '@/components/views/Post.vue';

export default {
  name: 'post',
  components: {
    NavBar,
    BackToTopButton,
    FooterBar,
    PostView
  },
  async asyncData({ $content, params, error }) {
    const slug = params.pathMatch;

    const posts = await $content('posts')
      .search('slug', slug)
      .fetch()
      .catch((err) => {
        error({
          statusCode: 500,
          message: 'Something went wrong',
          error: err,
        });
      });

    const post = posts?.find((post) => post.slug === slug);

    if (!post) {
      return error({ statusCode: 404, message: 'This post could not be found' });
    }

    return {
      post,
    };
  },
  head() {
    return {
      title: this.post.title || process.env.NUXT_ENV_SITE_NAME || process.env.NUXT_ENV_FULL_NAME,
    };
  },
};
</script>
