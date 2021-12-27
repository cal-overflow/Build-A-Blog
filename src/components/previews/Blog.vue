<template>
  <div class="text-center m-6 p-6 md:w-1/2 bg-gray-100 hover:rounded shadow-md hover:shadow-none">
    <nuxt-link to="/blog" class="font-bold">Blog</nuxt-link>
    <divider color="secondary-red" />
    <p>
      My blog is where I post all of my computer-related experiences. This consists of the struggle and learning I underwent working on things like the projects you’ll find in my portfolio. I also post blogs regarding my Iowa State University courses.
    </p>
    <nav-item title="View my blog" href="/blog" class="text-red" />
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
