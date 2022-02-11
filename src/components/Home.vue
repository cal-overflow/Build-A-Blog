<template>
  <div>
    <div class="max-w-screen-lg mx-auto">
      <div id="introduction-card" class="bg-card-light dark:bg-card-dark m-6 p-4 flex flex-wrap md:flex-nowrap shadow-lg dark:shadow-shadow-dark hover:shadow-none hover:rounded motion-safe:animate-fade-in-fast transition">
          <div class="max-w-sm md:w-2/5 lg:w-1/3 mx-auto md:my-auto">
            <img src="headshot.jpg" class="rounded-full border-2 border-extra-gray-light dark:border-extra-gray-dark motion-safe:animate-blur-fade-in-fast transition" alt="Headshot" />
          </div>
          <div class="md:w-3/5 lg:w-2/3 m-4 xs:mb-12 md:mb-0">
            <p class="text-lg font-bold mb-4">Hi. I'm Christian. <span class="motion-safe:animate-hand-wave animation-inline">👋</span></p>
            <nuxt-content :document="bio" class="prose prose-a:underline hover:prose-a:no-underline prose-a:text-primary-light dark:prose-invert dark:prose-a:text-primary-dark leading-normal transition" />
          </div>
        </div>
    </div>


    <div class="flex max-w-screen-lg mx-auto flex-wrap md:flex-nowrap">
      <portfolio-preview class="motion-safe:animate-fade-in" />
      <blog-preview class="motion-safe:animate-fade-in" />
    </div>
  </div>
</template>

<script>
import BlogPreview from '@/components/previews/Blog.vue';
import PortfolioPreview from '@/components/previews/Portfolio.vue';

export default {
  name: 'home',
  components: {
    BlogPreview,
    PortfolioPreview,
  },
  data: () => ({
    bio: undefined
  }),
  async mounted() {
    this.bio = await this.$content('about')
      .fetch()
      .catch((err) => {
        this.$nuxt.error({
          statusCode: 500,
          message: 'Something went wrong while fetching the "about me" content',
          error: err
        });
      });
  }
};
</script>

<style scoped>
.animation-inline {
  display: inline-block;
  transform-origin: 70% 70%;
}
</style>
