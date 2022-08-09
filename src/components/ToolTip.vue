<template>
  <div :class="`flex flex-col items-center my-2 w-80 text-center transition motion-safe:animate-fade-in ${classes ? classes : ''}`">
    <div class="w-2 h-2 bg-primary-light dark:bg-primary-dark rounded-full"></div>
    <p class="text-sm">{{content}}</p>
  </div>
</template>

<script>
export default {
  name: 'tool-tip',
  props: {
    text: {
      type: String,
      required: true
    },
    maxLength: {
      default: 100,
      type: Number,
      required: false
    },
    classes: {
      default: undefined,
      type: String,
      required: false
    }
  },
  computed: {
    content() {
      const showEllipsis = (this.text.length - 3) > this.maxLength;
      return `${this.text.substring(0, this.maxLength + 3)}${showEllipsis ? '...' : ''}`;
    }
  }
};
</script>
