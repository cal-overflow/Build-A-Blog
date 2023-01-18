<template>
  <main>
    <nav-bar :content="navigation.navbar" />
    <div class="max-w-screen-lg mx-auto">
      <div id="error-header-card" class="bg-card-light dark:bg-card-dark text-center m-6 p-4 px-6 flex-wrap shadow-lg hover:shadow-none hover:rounded motion-safe:animate-fade-in-fast transition">
        <p class="text-3xl md:text-5xl font-bold">This is embarrassing {{error.statusCode == '500' ? '🐢' : '😳'}}</p>
      </div>
      
      <divider />

      <div id="error-main-info-card" class="bg-card-light dark:bg-card-dark m-6 p-4 px-6 flex-wrap shadow-lg hover:shadow-none hover:rounded motion-safe:animate-fade-in transition">
        <div class="text-center">
          <p class="text-sm mb-2">Status code</p>
          <p class="text-5xl font-bold motion-safe:animate-blur-fade-in">{{error.statusCode}}</p>
          </div>

        <p class="text-3xl my-6 text-center">{{message}}</p>

        <divider />

        <div class="text-center">
          <nuxt-link ref="back-home" to="/" class="text-primary-light underline hover:no-underline dark:text-primary-dark transition">Take me home</nuxt-link>
        </div>
      </div>

      <div id="error-more-info-card" class="bg-card-light dark:bg-card-dark m-6 p-4 px-6 flex-wrap shadow-lg hover:shadow-none hover:rounded motion-safe:animate-fade-in transition">
        <div>
          <p class="font-bold text-2xl">More information 🤓</p>
          <pre class="text-extra-gray-dark dark:text-extra-gray-light whitespace-normal transition">
            {{extraInfo}}
          </pre>

          <p class="mt-2">If you believe there has been a mistake, please don't hesitate to <nuxt-link ref="contact-link" :to="contactLink" class="text-primary-light underline hover:no-underline dark:text-primary-dark transition">reach out to me</nuxt-link>.</p>
        </div>
      </div>

    </div>

    <footer-bar :content="navigation.footer" />
  </main>
</template>

<script>
import FooterBar from '@/components/structural/FooterBar.vue';
import NavBar from '@/components/structural/NavBar.vue';
import Divider from '@/components/helpers/Divider.vue';

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
  data: () => ({
    navigation: {
      navbar: {
        signatureNavItem: {
          title: 'Error',
          href: '/'
        },
      },
      footer: {
        navItems: [
          {
            title: 'Help',
            href: 'https://github.com/cal-overflow/portfolio'
          }
        ],
        imageNavItems: {}
      }
    },
  }),
  mounted() {
    this.$content().where({ path: '/navigation', extension: '.yml' })
      .fetch()
      .then((navigationContent) => {
        if (navigationContent.length !== 1) {
          return;
        }

        const navigation = navigationContent[0];

        if (!navigation || !navigation.footer || !navigation.navbar) {
          return;
        }
        
        this.navigation = navigation;
      })
      .catch((err) => {
        // TODO - don't error here. Instead do something default since on error page
        console.log(err);
      });
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
    },
    extraInfo() {
      if (this.error?.error)
        return this.error.error.message;
      
      if (this.error?.statusCode === 404)
        return "The page or post you're looking for does not exist.";

      return 'No more information is available 😕';
    },
  }
};
</script>
