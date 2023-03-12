<template>
  <main>
    <nav-bar :content="navigation.navbar" :current-page="currentPage" />
    <home-view :dir="directory" :content="content" :metadata="metadata" />
    <footer-bar :content="navigation.footer" :current-page="currentPage" />
  </main>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */

// must import components that are not directly used so that they are accessible within nuxt/content
import Divider from '@/components/misc/Divider.vue';
import HomeView from '@/components/views/Home.vue';
import HandWave from '@/components/misc/HandWave.vue';

export default {
  name: 'index',
  components: {
    Divider,
    HomeView,
    HandWave,
  },
  async asyncData({ $content, error }) {
    const directory = 'home';
    const nuxtContent = await $content(directory)
      .sortBy('id', 'desc')
      .fetch()
      .catch((err) => {
        error({
          statusCode: 500,
          message: 'Something went wrong',
          error: err,
        });
      });

    const isMetadata = ({ slug, extension }) => slug === "index" && extension === ".md";
    const metadata = nuxtContent?.find(isMetadata);
    const content = nuxtContent?.filter((item) => !isMetadata(item));


    if (!content) {
      return error({ statusCode: 404, message: 'This resource does not exist' });
    }

    if (!metadata || !metadata.primaryView || !metadata.secondaryView) {
      return error({ statusCode: 500, message: 'The home section does not contain valid metadata' });
    }

    metadata.view = metadata.primaryView;

    if (!content) {
      return error({ statusCode: 404, message: 'This resource does not exist' });
    }


    const navigationContent = await $content().where({ path: '/navigation', extension: '.yml' })
      .fetch()
      .catch((err) => {
        error({
          statusCode: 500,
          message: 'Something went wrong',
          error: err,
        });
      });

    if (navigationContent.length !== 1) {
      return error({ statusCode: 500, message: 'The navigation has not been configured.' });
    }

    const navigation = navigationContent[0];

    if (!navigation || !navigation.footer || !navigation.navbar) {
      return error({ statusCode: 500, message: 'The navigation has not been configured.' });
    }

    return {
      content,
      metadata,
      navigation,
      directory,
      currentPage: 'Home'
    };
  },
  head() {
    return {
      title:
      this.content?.title ||
      process.env.NUXT_ENV_SITE_NAME ||
      process.env.NUXT_ENV_FULL_NAME,
    };
  },
};
</script>
