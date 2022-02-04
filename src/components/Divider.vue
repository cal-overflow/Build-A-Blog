<template>
  <HR :class=style />
</template>

<script>
export default {
  name: 'divider',
  props: {
    width: {
      type: String,
      default: 'w-1/4',
    },
  },
  computed: {
    style() {
      return `bg-extra-gray-light text-extra-gray-light dark:bg-extra-gray-dark dark:text-extra-gray-light transition ${this.width} mx-auto my-1 border-0 h-0.5 rounded-none`;
    },
  },
};
</script>
