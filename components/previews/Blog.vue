<template>
  <div class="text-center m-4 md:w-1/2">
    <a href="/blog" class="font-bold">Blog</a>
    <divider color="red-400" />
    <p>
      My blog is where I post all of my computer-related experiences. This consists of the struggle and learning I underwent working on things like the projects you’ll find in my portfolio. I also post blogs regarding my Iowa State University courses.
    </p>
    <nav-item title="View my blog" href="/blog" class="text-red-600" />
  </div>
</template>

<script>
import Divider from '@/components/Divider.vue';
import NavItem from '@/components/NavItem.vue';

export default {
  name: 'BlogPreview',
  components: {
    Divider,
    NavItem
  },
};
</script>
