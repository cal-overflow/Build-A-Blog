<template>
  <main>
    <nav-bar current-page="Categories" />
    <div v-if="categories" class="max-w-screen-lg mx-auto">
      <div class="bg-card-light dark:bg-card-dark m-6 p-6 shadow-md dark:shadow-shadow-dark hover:shadow-none hover:rounded motion-safe:animate-fade-in-fast transition">
        <p class="text-center text-3xl font-bold">Categories</p>
      </div>
      <divider />

      <category-preview
        v-for="(category, i) in categories"
        :key="category.slug"
        :category="category"
        :index="i"
      />
    </div>
    <back-to-top-button />
    <footer-bar />
  </main>
</template>

<script>
import Divider from '@/components/Divider.vue';
import CategoryPreview from '@/components/previews/Category.vue';
import NavBar from '@/components/NavBar.vue';
import FooterBar from '@/components/FooterBar.vue';
import BackToTopButton from '@/components/BackToTopButton.vue';

export default {
  name: 'blog',
  components: {
    CategoryPreview,
    Divider,
    NavBar,
    BackToTopButton,
    FooterBar
  },
  async asyncData({ $content, error }) {
    const content = await $content('categories')
      .fetch()
      .catch((err) => {
        error({
          statusCode: 500,
          message: 'Something went wrong while fetching categories',
          error: err
        });
      });
    
    return {
      categories: content.categories
    };
  },
};
</script>
