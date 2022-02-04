<template>
  <div id="portfolio-preview-card" class="flex flex-col justify-between bg-card-light dark:bg-card-dark text-center m-6 p-6 md:w-1/2 hover:rounded shadow-md dark:shadow-shadow-dark hover:shadow-none transition">
    <nuxt-link to="/category/portfolio" class="font-bold">Portfolio</nuxt-link>
    <divider width="w-2/5" />
    <p>
      You'll find my most remarkable projects and software development experiences in my portfolio. This varies from a complex real-time web-based multiplayer game to simple websites for local businesses.
    </p>
    <nav-item title="View my work" href="/category/portfolio" class="text-primary-light dark:!text-primary-dark underline hover:no-underline transition" />
  </div>
</template>

<script>
import Divider from '@/components/Divider.vue';
import NavItem from '@/components/NavItem.vue';

export default {
  name: 'portfolio-preview',
  components: {
    Divider,
    NavItem
  },
};
</script>