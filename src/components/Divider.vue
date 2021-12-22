<template>
  <HR :class=style />
</template>

<script>
export default {
  name: 'Divider',
  props: {
    color: {
      type: String,
      default: 'gray-200',
    },
    width: {
      type: String,
      default: 'w-1/4',
    },
  },
  computed: {
    style() {
      return `bg-${this.color} text-${this.color} ${this.width} mx-auto my-1 border-0 h-0.5 rounded-none`;
    },
  },
};
</script>
