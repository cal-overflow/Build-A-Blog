<template>
  <div>
    <div class="max-w-screen-lg mx-auto">
      <div class="flex bg-gray-100 m-4 p-4 flex-wrap md:flex-nowrap justify-items-center shadow-lg">
          <div class="max-w-sm md:w-1/2 lg:w-1/3  mx-auto">
            <img src="Christian_headshot.jpg" class="rounded-full hover:drop-shadow-2xl" alt="Christian Headshot" />
          </div>
          <div class="md:w-1/2 lg:w-2/3 m-4 xs:mb-12 md:mb-0">
            <p class="text-lg font-bold mb-4">Hi, I'm Christian.</p>
            <p class="mb-4">
              I’m a junior at Iowa State University studying computer science. I’ve worked on all sorts of computer-related projects, from building myself a computer at fifteen years old to developing an engaging website for a local hair salon, <a href="http://roxysevensalon.com" target="_blank" class="text-primary-red underline">Roxy Seven Salon</a>.
            </p>

            <p class="mb-4">I’m not one for writing an extensive bio; besides, I think a lot of my work speaks for itself. Have a look around my <a class="text-primary-red underline">portfolio</a> to get a good sense of what kind of work I do.</p>

            <p class="mb-4">If you have any questions while viewing my website or want to get in touch, please feel free to <a class="text-primary-red underline">reach out to me</a>.</p>
          </div>
        </div>
    </div>


    <div class="flex justify-items-center max-w-screen-lg mx-auto flex-wrap md:flex-nowrap">
      <portfolio-preview />
      <blog-preview />
    </div>

    <p class="center"> Recent blog posts here</p>
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
