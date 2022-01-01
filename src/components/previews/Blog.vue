<template>
  <div class="bg-gray-100 dark:bg-zinc-800 text-center m-6 p-6 md:w-1/2 hover:rounded shadow-md dark:shadow-stone-800 hover:shadow-none">
    <nuxt-link to="/blog" class="font-bold">Blog</nuxt-link>
    <divider width="w-2/5" />
    <p>
      My blog is where I post all of my computer-related experiences. This consists of the struggle and learning I underwent working on things like the projects you’ll find in my portfolio. I also post blogs regarding my Iowa State University courses.
    </p>
    <nav-item title="View my blog" href="/blog" class="text-red dark:text-blue" />
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
