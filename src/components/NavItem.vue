<template>
  <nuxt-link
    v-if="active"
    :to="href"
    class="p-3 hover:underline text-red-600">
    {{title}}
  </nuxt-link>

  <nuxt-link
    v-else
    :to="href"
    class="p-3 hover:underline">
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