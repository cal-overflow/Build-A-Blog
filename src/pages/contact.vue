<template>
  <main>
    <nav-bar current-page="Contact" />
    <div id="contact-header-card" class="max-w-screen-lg mx-auto">
      <div class="bg-card-light dark:bg-card-dark m-6 p-4 shadow-md hover:shadow-none hover:rounded motion-safe:animate-fade-in-fast transition">
          <p class="text-center md:text-left text-3xl font-bold">Contact Me</p>
          <p class="text-center md:text-left text-md">Get in touch with me</p>
      </div>

        <divider />

      <contact-form />
    </div>

    <footer-bar current-page="Contact" />
  </main>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Divider from '@/components/Divider.vue';
import ContactForm from '@/components/ContactForm.vue';
import FooterBar from '@/components/FooterBar.vue';

export default {
  name: 'contact',
  components: {
    NavBar,
    Divider,
    ContactForm,
    FooterBar
  },
};
</script>
