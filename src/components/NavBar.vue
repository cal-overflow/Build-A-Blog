<template>
  <div id="nav-bar" class="bg-menu-light dark:bg-menu-dark transition">
    <nav class="mx-auto max-w-6xl flex items-center justify-between flex-wrap p-4 py-6 px-5">
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

        <svg id="sun" xmlns="http://www.w3.org/2000/svg" :class="`h-6 w-6 inline align-middle cursor-pointer transition ${sunIconClass}`" viewBox="0 0 20 20" fill="currentColor" @click="toggleTheme">
          <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
        </svg>

        <svg id="moon" xmlns="http://www.w3.org/2000/svg" :class="`h-6 w-6 inline align-middle cursor-pointer transition ${moonIconClass}`" viewBox="0 0 20 20" fill="currentColor" @click="toggleTheme">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
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
    ],
    currentTheme: undefined,
    sunIconClass: 'hidden',
    moonIconClass: 'hidden'
  }),
  mounted() {
    this.updateThemeToggleIcon();
  },
  methods: {
    updateThemeToggleIcon() {
      this.currentTheme = localStorage.getItem('theme');

      if (this.currentTheme === 'dark') {
        this.sunIconClass = '';
        this.moonIconClass = 'hidden';
      }
      else if (this.currentTheme === 'light') {
        this.sunIconClass = 'hidden';
        this.moonIconClass = '';
      }
    },
    toggleTheme() {
      if (this.currentTheme === 'dark') {
        localStorage.setItem('theme', 'light');
      }
      else if (this.currentTheme === 'light') {
        localStorage.setItem('theme', 'dark');
      }
      document.querySelector('body').classList.toggle('dark');

      this.updateThemeToggleIcon();
    }
  }
};
</script>