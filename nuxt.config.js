export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.NUXT_ENV_SITE_TITLE || process.env.NUXT_ENV_FULL_NAME,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: "Enter your site description here."
      },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins:400,700' }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/feed',
  ],

  feed: [
    { // (mostly) default feed object from feed module
      path: '/feed.xml',
      async create(feed) {
        const { $content } = require('@nuxt/content');
        
        feed.options = {
          title: process.env.NUXT_ENV_FULL_NAME,
          link: `${process.env.NUXT_ENV_SITE_URL}/feed.xml`,
          description: `Blog posts from ${process.env.NUXT_ENV_FULL_NAME}`,
        };

        const posts = await $content('posts').sortBy('createdAt', 'asc').fetch();

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.slug,
            link: `${process.env.NUXT_ENV_SITE_URL}/post/${post.slug}`,
            description: `posted on: ${post.date}`,
          });
        });

        const categoryContent = await $content('categories').fetch();
  
        categoryContent.categories.forEach((category) => {
          feed.addCategory(category.title);
        });
        
        feed.addContributor({
          name: process.env.NUXT_ENV_FULL_NAME,
          email: process.env.NUXT_ENV_EMAIL_ADDRESS,
          link: process.env.NUXT_ENV_SITE_URL
        });

      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
      data: [`${process.env.NUXT_ENV_FULL_NAME}'s Blog Feed`]
    }
  ],

  srcDir: 'src',

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    nestedProperties: ['post.categories'],
    markdown: {
      prism: {
        theme: "@/assets/css/prism-custom-theme.css"
      }
    },
    editor: '@/components/development/Editor.vue'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  generate: {
    fallback: true,
  },
};
