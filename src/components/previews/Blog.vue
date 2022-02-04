<template>
  <div id="blog-preview-card" class="flex flex-col justify-between bg-card-light dark:bg-card-dark text-center m-6 p-6 md:w-1/2 hover:rounded shadow-md dark:shadow-shadow-dark hover:shadow-none transition">
    <nuxt-link to="/blog" class="font-bold">Blog</nuxt-link>
    <divider width="w-2/5" />
    <p>
      My blog is where I post about my experiences as a software engineer. This consists of the struggle and learning I underwent while working on the projects you'll find in my portfolio or while taking a course at Iowa State University.
    </p>
    <nav-item title="View my blog" href="/blog" class="text-primary-light dark:!text-primary-dark underline hover:no-underline transition" />
  </div>
</template>

<script>
import Divider from '@/components/Divider.vue';
import NavItem from '@/components/NavItem.vue';

export default {
  name: 'blog-preview',
  components: {
    Divider,
    NavItem
  },
};
</script>
