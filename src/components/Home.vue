<template>
  <div>
    <div class="max-w-screen-lg mx-auto">
      <div id="introduction-card" class="bg-card-light dark:bg-card-dark m-6 p-4 flex flex-wrap md:flex-nowrap shadow-lg dark:shadow-shadow-dark hover:shadow-none hover:rounded motion-safe:animate-fade-in-fast transition">
          <div class="max-w-sm md:w-2/5 lg:w-1/3 mx-auto md:my-auto">
            <img src="~/assets/images/headshot.png" class="rounded-full motion-safe:animate-blur-fade-in-fast transition" alt="Headshot" />
          </div>
          <div class="w-full md:w-3/5 lg:w-2/3 m-4 xs:mb-12 md:mb-0">
            <p v-if="name" id="greeting" class="text-lg font-bold mb-4">Hi. I'm {{ name }}. <span class="motion-safe:animate-hand-wave animation-inline">👋</span></p>
            <div v-else class="bg-gray-500 w-1/3 h-4 my-2" />

            <nuxt-content
              v-if="bio"
              :document="bio"
              class="prose prose-a:underline hover:prose-a:no-underline prose-a:text-primary-light dark:prose-invert dark:prose-a:text-primary-dark leading-normal transition" 
            />
            <div v-else class="motion-safe:animate-pulse">
              <div v-for="i in 4" :key="`lazy-paragraph-1-${i}`" class="bg-gray-400 w-full h-4 my-2" />
              <div class="h-2" />
              <div v-for="i in 3" :key="`lazy-paragraph-2-${i}`" class="bg-gray-400 w-full h-4 my-2" />
              <div class="h-2" />
              <div v-for="i in 2" :key="`lazy-paragraph-3-${i}`" class="bg-gray-400 w-full h-4 my-2" />
            </div>
          </div>
        </div>
    </div>


    <div class="flex max-w-screen-lg mx-auto flex-wrap md:flex-nowrap">
      <page-preview :content="portfolioPreview" class="motion-safe:animate-fade-in" />
      <page-preview :content="blogPreview" class="motion-safe:animate-fade-in" />
    </div>
  </div>
</template>

<script>
import PagePreview from '@/components/previews/Page.vue';

export default {
  name: 'home',
  components: {
    PagePreview
  },
  props: {
    bio: {
      type: Object,
      default: undefined
    },
    portfolioPreview: {
      type: Object,
      default: undefined
    },
    blogPreview: {
      type: Object,
      default: undefined
    },
  },
  data: () => ({
    name: process.env.NUXT_ENV_FULL_NAME.split(' ')[0]
  })
};
</script>

<style scoped>
.animation-inline {
  display: inline-block;
  transform-origin: 70% 70%;
}
</style>
