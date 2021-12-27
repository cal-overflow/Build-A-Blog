<template>
  <div>
    <div class="max-w-screen-lg mx-auto">
      <div class="flex bg-gray-100 m-6 p-4 flex-wrap md:flex-nowrap shadow-lg hover:shadow-none hover:rounded">
          <div class="max-w-sm md:w-2/5 lg:w-1/3 mx-auto md:my-auto">
            <img src="Christian_headshot.jpg" class="rounded-full border-2 border-gray-200" alt="Christian Headshot" />
          </div>
          <div class="md:w-3/5 lg:w-2/3 m-4 xs:mb-12 md:mb-0">
            <p class="text-lg font-bold mb-4">Hi, I'm Christian.</p>
            <p class="mb-4">
              I’m a junior at Iowa State University studying computer science. I’ve worked on all sorts of computer-related projects, from building myself a computer at fifteen years old to developing an engaging website for a local hair salon, <a href="http://roxysevensalon.com" target="_blank" class="text-red underline">Roxy Seven Salon</a>.
            </p>

            <p class="mb-4">I’m not one for writing an extensive bio; besides, I think a lot of my work speaks for itself. Have a look around my portfolio to get a good sense of the kind of work I do.</p>

            <p class="mb-4">If you have any questions while viewing my website or want to get in touch, please feel free to <nuxt-link to="/contact" class="text-red underline">reach out to me</nuxt-link>.</p>
          </div>
        </div>
    </div>


    <div class="flex max-w-screen-lg mx-auto flex-wrap md:flex-nowrap">
      <portfolio-preview />
      <blog-preview />
    </div>
  </div>
</template>

<script>
import BlogPreview from '@/components/previews/Blog.vue';
import PortfolioPreview from '@/components/previews/Portfolio.vue';

export default {
  name: 'home',
  components: {
    BlogPreview,
    PortfolioPreview,
  },
};
</script>
