<template>
  <div>
    <div class="flex justify-center justify-items-center max-w-screen-xl mx-auto flex-wrap md:flex-nowrap">
      <portfolio-preview />
      <blog-preview />
    </div>
    <p>Hi, I'm Christian :)</p>
    <p>
      I’m a junior at Iowa State University majoring in computer science and minoring in cybersecurity engineering. I’ve worked on all sorts of computer-related projects, from building myself a computer at fifteen years old to developing an engaging website for a local hair salon, Roxy Seven Salon.
    </p>

    <p>
      I am currently working as a software developer apprentice at Source Allies. I am highly grateful for the opportunity to work for and learn from such a fantastic company.
    </p>
  </div>
</template>

<script>
import BlogPreview from '@/components/previews/Blog.vue';
import PortfolioPreview from '@/components/previews/Portfolio.vue';

export default {
  name: 'Home',
  components: {
    BlogPreview,
    PortfolioPreview,
  },
};
</script>
