<template>
  <main>
    <nav-bar />
    <div class="max-w-screen-lg mx-auto">
      <div class="text-center bg-gray-100 m-6 p-4 px-6 flex-wrap shadow-lg hover:shadow-none hover:rounded">
        <p class="text-3xl md:text-5xl font-bold">This is embarrassing {{error.statusCode == '500' ? '🐢' : '😳'}}</p>
      </div>
      
      <divider />

      <div class="bg-gray-100 m-6 p-4 px-6 flex-wrap shadow-lg hover:shadow-none hover:rounded">
        <div class="text-center">
          <p class="text-sm mb-2">Status code</p>
          <p class="text-5xl font-bold">{{error.statusCode}}</p>
          </div>

        <p class="text-3xl my-6 text-center">{{message}}</p>

        <divider />

        <div class="text-center">
          <nuxt-link ref="back-home" to="/" class="text-red hover:underline">Take me home</nuxt-link>
        </div>
      </div>

      <div class="bg-gray-100 m-6 p-4 px-6 flex-wrap shadow-lg hover:shadow-none hover:rounded">
        <div>
          <p class="font-bold text-2xl">More information 🤓</p>
          <pre v-if="error.error" class="text-gray-600">{{error.error.message}}</pre>
          <pre v-else-if="error.statusCode === 404" class="text-gray-600">The page or post you're looking for does not exist.</pre>
          <pre v-else class="text-gray-600">No more information is available 😕</pre>

          <p class="mt-2">If you believe there has been a mistake, please don't hesitate to <nuxt-link ref="contact-link" :to="contactLink" class="text-red">reach out to me</nuxt-link>.</p>
        </div>
      </div>

    </div>

    <footer-bar />
  </main>
</template>

<script>
import FooterBar from '../components/FooterBar.vue';
import NavBar from '@/components/NavBar.vue';
import Divider from '@/components/Divider.vue';

export default {
  name: 'error',
  components: {
    NavBar,
    FooterBar,
    Divider,
  },
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  computed: {
    message() {
      switch (this.error?.statusCode) {
      case 404:
        return this.error.message || 'Page not found';
      case 500:
        return this.error.message || 'Something went wrong';
      default:
        return this.error.message || 'Something went wrong';
      }
    },
    contactLink() {
      const status = this.error.statusCode;
      const path = encodeURIComponent(this.$nuxt.$route.path);
      const detail = this.error.error ? `&detail=${encodeURIComponent(this.error.error.message)}` : '';

      return `/contact?statusCode=${status}&path=${path}${detail}`;
    }
  }
};
</script>
