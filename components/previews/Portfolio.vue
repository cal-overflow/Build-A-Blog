<template>
  <div class="text-center m-4 p-4 md:w-1/2 bg-gray-100 shadow-md">
    <a href="/portfolio" class="font-bold">Portfolio</a>
    <divider color="secondary-red" />
    <p>
      In my portfolio, you’ll find my most remarkable projects and software development experiences. This varies from a complex real-time web-based multiplayer game to a simple website for a local business. Most of these projects were made for school courses, but some were created for business.
    </p>
    <nav-item title="View my work" href="/portfolio" class="text-red-600" />
  </div>
</template>

<script>
import Divider from '@/components/Divider.vue';
import NavItem from '@/components/NavItem.vue';

export default {
  name: 'PortfolioPreview',
  components: {
    Divider,
    NavItem
  },
};
</script>