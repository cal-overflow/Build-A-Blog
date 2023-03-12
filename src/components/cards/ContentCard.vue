<template>
  <card class="grow page-preview-card flex m-0 col-span-1 flex-col justify-between text-center w-full">
    <nuxt-content
      :document="content"
      class="w-full max-w-none prose prose:dark-invert dark:prose-invert leading-normal prose-code:before:content-none prose-code:after:content-none transition"
    />
  </card>
</template>

<script>
import Card from '@/components/cards/Card.vue';

export default {
  name: 'content-card',
  components: {
    Card,
  },
  props: {
    content: {
      type: Object,
      default: undefined
    },
  }
};
</script>
