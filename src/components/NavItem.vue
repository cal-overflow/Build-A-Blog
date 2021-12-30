<template>
  <nuxt-link
    :to="href"
    :class="`p-3 hover:underline ${active ? 'text-red' : ''}`">
    {{title}}
  </nuxt-link>
</template>

<script>
export default {
  name: 'nav-item',
  props: {
    title: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    }
  },
};
</script>