<template>
  <div>
    <nuxt-content
      v-for="item in content"
      :key="item.slug"
      :document="item"
      class="prose prose-a:underline hover:prose-a:no-underline prose-a:text-primary-light dark:prose-invert dark:prose-a:text-primary-dark leading-normal transition" 
    />
  </div>
</template>

<script>
export default {
  name: 'custom-view',
  props: {
    content: {
      type: Array,
      required: true
    },
  },
};
</script>

<style scoped>
.animation-inline {
  display: inline-block;
  transform-origin: 70% 70%;
}
</style>
