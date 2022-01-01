<template>
  <div class="bg-gray-100 dark:bg-zinc-800 text-center m-6 p-6 md:w-1/2 hover:rounded shadow-md dark:shadow-stone-800 hover:shadow-none">
    <nuxt-link to="/category/portfolio" class="font-bold">Portfolio</nuxt-link>
    <divider width="w-2/5" />
    <p>
      In my portfolio, you’ll find my most remarkable projects and software development experiences. This varies from a complex real-time web-based multiplayer game to a simple website for a local business. Most of these projects were made for school courses, but some were created for business.
    </p>
    <nav-item title="View my work" href="/category/portfolio" class="text-red dark:!text-blue" />
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