<template>
  <div class="page-preview-card flex flex-col justify-between bg-card-light dark:bg-card-dark text-center m-6 p-6 w-full md:w-1/2 hover:rounded shadow-md dark:shadow-shadow-dark hover:shadow-none transition">
    <nuxt-content
      v-if="content"
      :document="content"
      class="prose prose:dark-invert dark:prose-invert leading-normal transition"
    />

    <div v-else class="page-preview-lazy">
      <div class="bg-gray-400 motion-safe:animate-pulse w-1/4 mx-auto h-4 mb-4 center" />
      <div v-for="i in 8"  :key="`lazy-preview-${i}`" class="bg-gray-400 motion-safe:animate-pulse w-full h-4 my-1" />
      <div class="bg-primary-light dark:bg-primary-dark motion-safe:animate-pulse w-1/3 mx-auto h-4 mt-2 center" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-preview',
  props: {
    content: {
      type: Object,
      default: undefined
    },
  }
};
</script>
