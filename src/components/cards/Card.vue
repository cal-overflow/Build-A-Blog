<template>
  <div class="bg-card-light dark:bg-card-dark m-6 p-4 md:p-6 flex flex-wrap md:flex-nowrap shadow-lg dark:shadow-shadow-dark hover:shadow-none hover:rounded motion-safe:animate-fade-in-fast transition">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    content: {
      type: Object,
      default: undefined
    },
  }
};
</script>
