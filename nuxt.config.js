export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.NUXT_ENV_SITE_NAME || process.env.NUXT_ENV_FULL_NAME,
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
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins:400,700' }
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

  // feed: [
  //   // TODO - fix (issue #132)
  //   { // (mostly) default feed object from feed module
  //     path: '/feed.xml',
  //     async create(feed) {
  //       const { $content } = require('@nuxt/content');

  //       const author = {
  //         name: process.env.NUXT_ENV_FULL_NAME,
  //         email: process.env.NUXT_ENV_EMAIL_ADDRESS,
  //         link: process.env.NUXT_ENV_SITE_URL,
  //       };
  //       
  //       feed.options = {
  //         title: process.env.NUXT_ENV_FULL_NAME,
  //         id: process.env.NUXT_ENV_SITE_URL,
  //         link: process.env.NUXT_ENV_SITE_URL,
  //         description: `${process.env.NUXT_ENV_SITE_NAME} posts`,
  //         favicon: `${process.env.NUXT_ENV_SITE_URL}/favicon.ico`,
  //         author,
  //       };

  //       const nuxtContent = await $content('', { deep: true }).fetch();
  //       // console.log(nuxtContent);

  //       nuxtContent.forEach((item) => {
  //         // NOTES;
  //         // 1. need to support info.yml (should be a section (probably a feed Item) - not a category))
  //         // 2. need to support tags - should be equivalent to categories
  //         //
  //         if (item.extension === '.yml') {
  //           // Handle sections
  //           const feedItem = {
  //             title: item.title,
  //             id: item.slug,
  //             description: item.description,
  //             link: `${process.env.NUXT_ENV_SITE_URL}${item.dir}`,
  //           };

  //           feed.addItem(feedItem);
  //         }
  //         else if (item.extension === '.md') {
  //           // Handle posts
  //           const postUrl = `${process.env.NUXT_ENV_SITE_URL}${item.dir}/${item.slug}`;
  //           const feedItem = {
  //             title: item.title,
  //             id: postUrl,
  //             link: postUrl,
  //             description: item.excerpt,
  //             content: item.content
  //           };

  //           feedItem.description = JSON.stringify({ ...item, toc: '', body: '' }); // TDO -remove

  //           feed.addItem(feedItem);
  //         }
  //         else console.log(item);
  //       });
  //       
  //       feed.addContributor(author);
  //     },
  //     // cacheTime: 1000 * 60 * 15,
  //     cacheTime: 0,
  //     type: 'rss2',
  //     data: [`${process.env.NUXT_ENV_FULL_NAME}'s Blog Feed`]
  //   }
  // ],
  
  feed: async () => {
    const author = {
      name: process.env.NUXT_ENV_FULL_NAME,
      email: process.env.NUXT_ENV_EMAIL_ADDRESS,
      link: process.env.NUXT_ENV_SITE_URL,
    };

    const { $content } = require('@nuxt/content');
    const nuxtContent = await $content('', { deep: true, text: true }).sortBy('createdAt', 'asc').fetch();


    const sections = [...new Set(
                          nuxtContent
                          .filter(({ extension }) => extension === '.yml')
                          .map((section) => ({ ...section, posts: [] })))];

    nuxtContent.forEach((item) => {
      if (item.extension !== '.md') {
        return;
      }

      // TODO - switch the sections from a list to a map so this can be a key lookup 

      for (const section of sections) {
        if (section.dir === item.dir) {
          section.posts.push(item);
          break;
        }
      }
    });

    

    return sections.map(({ title, description, dir, posts }) => {

      return {
        path: `${dir}.xml`, // Note `dir` begins with /
        create(feed) {
          feed.options = {
            title: `${title} - ${process.env.NUXT_ENV_SITE_NAME}`,
            id: process.env.NUXT_ENV_SITE_URL,
            link: `${process.env.NUXT_ENV_SITE_URL}${dir}`,
            favicon: `${process.env.NUXT_ENV_SITE_URL}/favicon.ico`,
            description,
            author,
          };

          posts.forEach((post) => {
             const postUrl = `${process.env.NUXT_ENV_SITE_URL}${dir}/${post.slug}`;
            feed.addItem({
              title: post.title,
              id: postUrl,
              link: postUrl,
              content: post.text,
            });
          });
        },
        // TODO -revert
        // cacheTime: 1000 * 60 * 15,
        cacheTime: 0,
        type: 'rss2'
      };
    });
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    // nestedProperties: ['post.tags'],
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

  srcDir: 'src',
};
