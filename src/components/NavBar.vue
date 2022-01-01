<template>
  <div class="bg-gray-200 dark:bg-zinc-700">
    <nav class="mx-auto max-w-6xl flex items-center justify-between flex-wrap p-4 py-6 px-5 mb-4">
      <nav-item
        :title="signatureHeader.title"
        :href="signatureHeader.href"
        :active="currentPage === 'Home'"
        class="font-bold">
        Christian Lisle
      </nav-item>
        
      <div class="justify-between">
        <nav-item
          v-for="item in items"
          :key="item.title"
          :title="item.title"
          :href="item.href"
          :active="currentPage === item.title"
        />
      </div>
    </nav>
  </div>
</template>

<script>
import NavItem from './NavItem.vue';
export default {
  name: 'nav-bar',
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
    signatureHeader: {
      title: 'Christian Lisle',
      href: '/'
    },
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
  })
};
</script>