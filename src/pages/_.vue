<template>
  <main>
    <!-- TODO - fix the current page -->
    <nav-bar :current-page="currentPage" />

    <!-- if /posts/slug -->
    <post-view v-if="directory === 'posts'" :route="$router.history.current.path" />
    <!-- if /blog -->
    <post-feed v-if="directory === 'blog'" title="Blog" />
    <!-- if /tags/slug -->
    <post-feed v-if="directory === 'tags' && slug" :tag="content" />
    <!-- if /tags -->
    <tag-feed v-else-if="directory === 'tags'" :path="directory" />


    <back-to-top-button />
    <footer-bar :current-page="currentPage" />
  </main>
</template>

<script>
import NavBar from '@/components/structural/NavBar.vue';
import BackToTopButton from '@/components/helpers/BackToTopButton.vue';
import FooterBar from '@/components/structural/FooterBar.vue';
import PostFeed from '@/components/views/PostFeed.vue';
import TagFeed from '@/components/views/TagFeed.vue';
import PostView from '@/components/views/Post.vue';

export default {
  name: 'wildcard',
  components: {
    NavBar,
    BackToTopButton,
    FooterBar,
    PostView,
    PostFeed,
    TagFeed
  },
  async asyncData({ $content, params, error }) {
    const lastIndex = params.pathMatch.includes('/') ? params.pathMatch.lastIndexOf('/') : params.pathMatch.length;
    const directory = params.pathMatch.slice(0, lastIndex); 
    const slug = params.pathMatch.slice(lastIndex + 1);

    if (directory === 'blog') {
      return { directory, currentPage: 'Blog' };
    }

    const nuxtContent = await $content(directory)
      .fetch()
      .catch((err) => {
        error({
          statusCode: 500,
          message: 'Something went wrong',
          error: err,
        });
      });

    const content = nuxtContent?.find((item) => item.slug === slug);

    if (!content) {
      return error({ statusCode: 404, message: 'This resource does not exist' });
    }

    return {
      content,
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
