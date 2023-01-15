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
  components: [
    '~/components/development',
    '~/components/forms',
    '~/components/helpers',
    '~/components/misc',
    '~/components/navigation',
    '~/components/previews',
    '~/components/structural',
    '~/components/views',
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-content-body-html',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/feed',
  ],

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
                          .filter(({ path, extension }) => path.endsWith('/index') && extension === '.md')
                          .map((section) => ({ ...section, posts: [] })))];

    nuxtContent.forEach((item) => {
      if (item.extension !== '.md') {
        return;
      }

      for (const section of sections) {
        if (section.dir === item.dir) {
          section.posts.push(item);
          break;
        }
      }
    });

    

    return sections.map(({ title, description, dir, posts, tags }) => {

      return {
        path: `${dir}.xml`, // `dir` begins with /
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
              content: post.bodyHtml
            });
          });

        feed.addContributor(author);

          tags?.forEach((tag) => {
            feed.addCategory(tag.title);
          });
        },
        cacheTime: 1000 * 60 * 15,
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
