<template>
  <div class="grow page-preview-card flex col-span-1 flex-col justify-between bg-card-light dark:bg-card-dark text-center p-6 w-full hover:rounded shadow-md dark:shadow-shadow-dark hover:shadow-none transition">
    <nuxt-content
      :document="content"
      class="w-full max-w-none prose prose:dark-invert dark:prose-invert leading-normal transition"
    />
  </div>
</template>

<script>
export default {
  name: 'basic-card',
  props: {
    content: {
      type: Object,
      default: undefined
    },
  }
};
</script>
