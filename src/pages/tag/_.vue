<template>
  <main>
    <nav-bar :current-page="currentPage" />
    <post-feed :tag="tag" />
    <back-to-top-button />
    <footer-bar :current-page="currentPage" />
  </main>
</template>

<script>
import NavBar from '@/components/structural/NavBar.vue';
import PostFeed from '@/components/views/PostFeed.vue';
import FooterBar from '@/components/structural/FooterBar.vue';
import BackToTopButton from '@/components/helpers/BackToTopButton.vue';

export default {
  name: 'tag',
  components: {
    NavBar,
    PostFeed,
    BackToTopButton,
    FooterBar
  },
  async asyncData({ $content, params, error }) {
    const slug = params.pathMatch.toLowerCase();

    const content = await $content('tags')
      .fetch()
      .catch((err) => {
        error({
          statusCode: 500,
          message: 'Something went wrong',
          error: err,
        });
      });

      const tag = content?.tags?.find((tag) => tag.slug === slug);

      if (!tag) {
        return error({ statusCode: 404, message: 'This tag could not be found' });
      }

    return {
      tag
    };
  },
  head() {
    return {
      title: this.tag?.title || process.env.NUXT_ENV_SITE_NAME || process.env.NUXT_ENV_FULL_NAME,
    };
  },
  computed: {
    currentPage() {
      return this.tag?.title ?? 'Tags';
    }
  }
};
</script>
