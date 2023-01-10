<template>
  <div id="nav-bar" class="bg-menu-light dark:bg-menu-dark transition">
    <nav class="mx-auto max-w-6xl flex flex-wrap items-center sm:justify-between justify-center p-4 py-6 px-5 text-center">
      <nav-item
        :href="signatureHeader.href"
        :active="currentPage === 'Home'"
        class="font-bold w-full sm:w-auto">
        {{ signatureHeader.title }}
      </nav-item>
        
      <div class="justify-between">
        <nav-item
          v-for="item in items"
          :key="item.title"
          :href="item.href"
          :active="currentPage === item.title"
        >
          {{ item.title }}
        </nav-item>
      </div>
    </nav>
  </div>
</template>

<script>
import NavItem from '../navigation/NavItem.vue';

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
      title: process.env.NUXT_ENV_FULL_NAME,
      href: '/'
    },
    items: [
      {
        title: 'Blog',
        href: '/blog'
      },
      {
        title: 'Portfolio',
        href: '/portfolio'
      }
    ],
  })
};
</script>
