<template>
  <div class="bg-gray-800 text-white">
    <nav class="mx-auto max-w-6xl flex items-center justify-between flex-wrap p-4 py-6 px-5">
      <div class="justify-between">
        <nav-item
          v-for="item in items"
          :key="item.title"
          :title="item.title"
          :href="item.href"
        />
      </div>
    </nav>
  </div>
</template>

<script>
import NavItem from './NavItem.vue';

export default {
  name: 'footer-bar',
  components: {
    NavItem
  },
  props: {
    currentPage: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    items: [
      {
        title: 'Blog',
        href: '/blog'
      },
      {
        title: 'Portfolio',
        href: '/category/portfolio'
      }
    ]
  }),
};
</script>