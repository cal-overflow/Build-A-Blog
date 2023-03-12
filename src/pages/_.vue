<template>
  <main>
    <nav-bar :content="navigation.navbar" :current-page="currentPage" />

    <home-view v-if="metadata.view === 'home-view'" :dir="directory" :content="content" :metadata="metadata" />
    <post-view v-if="metadata.view === 'post-view'" :dir="directory" :content="content" />
    <post-feed
      v-if="metadata.view === 'post-feed'"
      :metadata="metadata"
      :dir="directory"
      :content="content"
    />


    <back-to-top-button />
    <footer-bar :content="navigation.footer" :current-page="currentPage" />
  </main>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */

// must import components that are not directly used so that they are accessible within nuxt/content
import Divider from '@/components/misc/Divider.vue';
import HomeView from '@/components/views/Home.vue';
import PostView from '@/components/views/Post.vue';
import HandWave from '@/components/misc/HandWave.vue';

export default {
  name: 'wildcard',
  components: {
    Divider,
    HomeView,
    PostView,
    HandWave,
  },
  async asyncData({ $content, params, error }) {
    const lastForwardSlashIndex = params.pathMatch.includes('/') ? params.pathMatch.lastIndexOf('/') : params.pathMatch.length;
    let directory = params.pathMatch.slice(0, lastForwardSlashIndex);
    const anchorIndex = params.pathMatch.indexOf('#');
    const lastIndex = anchorIndex === -1 ? params.pathMatch.length : anchorIndex;
    const slug = params.pathMatch.substring(lastForwardSlashIndex + 1, lastIndex + 1);


    if (!directory) {
      directory = 'home';
    }

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
    let content = nuxtContent?.filter((item) => !isMetadata(item));


    if (!content) {
      return error({ statusCode: 404, message: 'This resource does not exist' });
    }

    if (!metadata || !metadata.primaryView || !metadata.secondaryView) {
      return error({ statusCode: 500, message: 'This section does not contain valid metadata' });
    }


    // TODO - This will be an issue if the metadata is not an object 
    //        consider 
    metadata.view = metadata.primaryView;
    
    if (slug) {
      content = content?.find((item) => item.slug === slug);
      metadata.view = metadata.secondaryView;
    }

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
      return error({ statusCode: 500, message: 'The navigation has been configured incorrectly.' });
    }

    const navigation = navigationContent[0];

    if (!navigation || !navigation.footer || !navigation.navbar) {
      return error({ statusCode: 500, message: 'The navigation has not been configured.' });
    }

    return {
      content,
      metadata,
      slug,
      navigation,
      directory,
      currentPage: slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : directory.charAt(0).toUpperCase() + directory.slice(1)
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
