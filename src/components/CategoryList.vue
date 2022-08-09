<template>
  <div id="category-list" :class="`w-48 flex flex-col bg-card-light dark:bg-card-dark mt-4 shadow-lg dark:shadow-shadow-dark hover:shadow-none hover:rounded motion-safe:animate-fade-in-fast transition ${classes}`">
    <nav-item
      v-for="(category, i) in categories"
      :key="category.title"
      :ref="category.slug"
      :href="`/category/${category.slug}`"
      class="text-center mx-4 transition"
      :style="`animation: fade-in ${((i + 1) * 0.25)}s ease-in-out;`"
      :active="currentPage === category.title"
    >
      {{ category.title }}
    </nav-item>
    <p v-if="isErrorLoadingCategories">Error</p>
  </div>
</template>

<script>
export default {
  name: 'category-list',
  props: {
    classes: {
      type: String,
      default: ''
    },
    currentPage: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    categories: [],
    isErrorLoadingCategories: false,
  }),
  async fetch() {
    const content = await this.$content('categories')
    .fetch()
    .catch(() => {
      this.isErrorLoadingCategories = true;
    });
    
    this.categories = content?.categories;
  },
};
</script>
