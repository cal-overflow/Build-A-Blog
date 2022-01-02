export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Christian Lisle',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: "Software engineer passionate about personal projects, open source, and all things software." },
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
          title: 'Christian Lisle',
          link: 'https://www.christianlisle.com/feed.xml',
          description: "Blog posts from Christian Lisle",
        };

        const posts = await $content('posts').sortBy('createdAt', 'asc').fetch();

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.slug,
            link: `https://www.christianlisle.com/post/${post.slug}`,
            description: `posted on: ${post.date}`,
          });
        });

        const categories = await $content('categories').fetch();
  
        categories.forEach((category) => {
          feed.addCategory(category.title);
        });
        
        feed.addContributor({
          name: 'Christian Lisle',
          email: 'lisleachristian@gmail.com',
          link: 'https://www.christianlisle.com'
        });

      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
      data: ["Christian Lisle's Blog Feed"]
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
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  generate: {
    fallback: true,
  },
};
