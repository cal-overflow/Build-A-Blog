<template>
  <main>
    <nav-bar :current-page="currentPage" />
    <blog-feed :category="category" />
    <footer-bar :current-page="currentPage" />
  </main>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import BlogFeed from '@/components/BlogFeed.vue';
import FooterBar from '@/components/FooterBar.vue';

export default {
  name: 'category',
  components: {
    NavBar,
    BlogFeed,
    FooterBar,
  },
  async asyncData({ $content, params, error }) {
    const slug = params.pathMatch.toLowerCase();

    const categories = await $content('categories')
      .where({slug})
      .fetch()
      .catch((err) => {
        error({
          statusCode: 500,
          message: 'Something went wrong',
          error: err,
        });
      });

      const category = categories?.find((category) => category.slug === slug);

      if (!category) {
        return error({ statusCode: 404, message: 'This category could not be found' });
      }

    return {
      category
    };
  },
  head() {
    return {
      title: this.category?.title || 'Christian Lisle',
    };
  },
  computed: {
    currentPage() {
      return this.category?.title === 'Portfolio' ? 'Portfolio' : 'Blog';
    }
  }
};
</script>
