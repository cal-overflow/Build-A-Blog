<template>
  <div id="nav-bar" class="bg-menu-light dark:bg-menu-dark transition">
    <nav class="mx-auto max-w-6xl flex flex-wrap items-center sm:justify-between justify-center p-4 py-6 px-5 text-center">
      <nav-item
        v-if="content.signatureNavItem"
        :href="content.signatureNavItem.href"
        :active="currentPage === 'Home'"
        class="font-bold w-full sm:w-auto">
        {{ content.signatureNavItem.title }}
      </nav-item>
        
      <div class="justify-between flex sm:flex-none flex-wrap">
        <nav-item
          v-for="item in content.navItems"
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
import NavItem from './NavItem.vue';

export default {
  name: 'nav-bar',
  components: {
    NavItem
  },
  props: {
    content: {
      type: Object,
      required: true,
      default: () => ({})
    },
    currentPage: {
      type: String,
      default: ''
    }
  },
};
</script>
