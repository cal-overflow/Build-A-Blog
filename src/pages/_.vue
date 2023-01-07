<template>
  <main>
    <!-- TODO - fix the current page -->
    <nav-bar :current-page="currentPage" />

    <post-view v-if="metadata.view === 'post-view'" />
    <post-feed v-if="metadata.view === 'post-feed'" :title="metadata.title" :content="content" />

    <back-to-top-button />
    <footer-bar :current-page="currentPage" />
  </main>
</template>

<script>
import NavBar from '@/components/structural/NavBar.vue';
import BackToTopButton from '@/components/helpers/BackToTopButton.vue';
import FooterBar from '@/components/structural/FooterBar.vue';
import PostFeed from '@/components/views/PostFeed.vue';
import PostView from '@/components/views/Post.vue';

export default {
  name: 'wildcard',
  components: {
    NavBar,
    BackToTopButton,
    FooterBar,
    PostView,
    PostFeed,
  },
  async asyncData({ $content, params, error }) {
    const lastIndex = params.pathMatch.includes('/') ? params.pathMatch.lastIndexOf('/') : params.pathMatch.length;
    const directory = params.pathMatch.slice(0, lastIndex); 
    const slug = params.pathMatch.slice(lastIndex + 1);

    const nuxtContent = await $content(directory)
      .fetch()
      .catch((err) => {
        error({
          statusCode: 500,
          message: 'Something went wrong',
          error: err,
        });
      });

    const isMetadata = ({ slug, extension }) => slug === "info" && extension === ".yml";

    const metadata = nuxtContent?.find(isMetadata);
    let content = nuxtContent?.filter((item) => !isMetadata(item));

    if (!content) {
      return error({ statusCode: 404, message: 'This resource does not exist' });
    }

    if (!metadata || !metadata['primary-view'] || !metadata['secondary-view']) {
      return error({ statusCode: 500, message: 'This section does not contain a valid info.yml' });
    }


    // TODO - This will be an issue if the metadata is not an object 
    //        consider 
    metadata.view = metadata['primary-view'];
    
    if (slug) {
      content = content?.find((item) => item.slug === slug);
      metadata.view = metadata['secondary-view'];
    }

    if (!content) {
      return error({ statusCode: 404, message: 'This resource does not exist' });
    }

    return {
      content,
      metadata,
      slug,
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
