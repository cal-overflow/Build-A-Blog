<template>
  <div id="portfolio-preview-card" class="flex flex-col justify-between bg-card-light dark:bg-card-dark text-center m-6 p-6 md:w-1/2 hover:rounded shadow-md dark:shadow-shadow-dark hover:shadow-none transition">
    <nuxt-link to="/category/portfolio" class="font-bold">Portfolio</nuxt-link>
    <divider width="w-2/5" />
    <nuxt-content :document="content" class="prose prose:dark-invert dark:prose-invert leading-normal transition" />
    <nav-item title="View my work" href="/category/portfolio" class="text-primary-light dark:!text-primary-dark underline hover:no-underline transition" />
  </div>
</template>

<script>
import Divider from '@/components/Divider.vue';
import NavItem from '@/components/NavItem.vue';

export default {
  name: 'portfolio-preview',
  components: {
    Divider,
    NavItem
  },
  data: () => ({
    content: undefined
  }),
  async mounted() {
    this.content = await this.$content('portfolio-preview')
      .fetch()
      .catch((err) => {
        this.$nuxt.error({
          statusCode: 500,
          message: 'Something went wrong while fetching the portolio preview description',
          error: err
        });
      });
  }
};
</script>