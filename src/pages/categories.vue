<template>
  <main>
    <nav-bar current-page="Categories" />
    <div class="max-w-screen-lg mx-auto">
      <div class="bg-card-light dark:bg-card-dark m-6 p-6 shadow-md dark:shadow-shadow-dark hover:shadow-none hover:rounded motion-safe:animate-fade-in-fast transition">
        <p class="text-center text-3xl font-bold">Categories</p>
      </div>
      <divider />

      <div v-if="categories && categories.length">
        <category-preview
          v-for="(category, i) in categories"
          :key="category.slug"
          :category="category"
          :index="i"
        />
      </div>

      <div v-else-if="!isDoneFetchingCategories">
        <category-preview
          v-for="(n, i) in 3"
          :key="`category-lazy-loader-${n}`"
          :index="i"
        />
      </div>
      
      <div v-else class="bg-card-light dark:bg-card-dark m-6 p-6 hover:rounded shadow-md dark:shadow-shadow-dark hover:shadow-none motion-safe:animate-fade-in transition col-span-2">
        <p class="text-center md:text-left text-2xl font-bold mt-2">No categories 😴</p>
        <p class="text-center md:text-left">There are not currently any categories</p>
      </div>

    </div>
    <back-to-top-button />
    <footer-bar current-page="Categories" />
  </main>
</template>

<script>
import Divider from '@/components/Divider.vue';
import CategoryPreview from '@/components/previews/Category.vue';
import NavBar from '@/components/NavBar.vue';
import FooterBar from '@/components/FooterBar.vue';
import BackToTopButton from '@/components/BackToTopButton.vue';

export default {
  name: 'categories',
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
      categories: content.categories,
      isDoneFetchingCategories: true
    };
  },
};
</script>
