<template>
  <main>
    <nav-bar current-page="Blog" />
    <div v-if="post" class="max-w-screen-lg mx-auto flex bg-gray-100 m-6 p-4 px-6 flex-wrap shadow-lg hover:shadow-none hover:rounded">
      <div class="w-full p-4">
        <p class="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">{{post.title}}</p>
        <div class="text-gray-600">
          <p>{{post.date}}
            <span v-if="post.categories.length">
              /
              <span
                v-for="(category, i) in post.categories"
                :key="`categories-${category}`"
              >
                <a :href="`/category/${category.toLowerCase().replace(' ', '-')}`" class="hover:underline">
                  {{category}}
                </a>
                {{(i + 1) === post.categories.length ? '' : ', '}}
              </span>
            </span>
          </p>
        </div>

        <img :src="`/blog-images/feature/${post.img}`" class="object-contain w-full md:w-3/4 lg:w-8/12 mx-auto lg:mx-auto max-h-screen" />
        <nuxt-content :document="post" class="prose m-4 mx-auto max-w-none prose-a:text-red prose-a:underline hover:prose-a:text-secondary-red" />
      </div>
    </div>

    <div v-else class="max-w-screen-lg mx-auto flex bg-gray-100 m-6 p-4 px-6 flex-wrap shadow-lg hover:shadow-none hover:rounded animate-pulse">
      <div class="w-full p-4">
        <div class="bg-gray-600 w-80 lg:w-96 h-16 mb-2" />
        <div class="bg-gray-300 w-60 h-4 mb-1" />

      <div class="bg-gray-500 w-full md:w-3/4 lg:w-8/12 mx-auto lg:mx-auto h-96 max-h-screen" />
      <div v-for="i in 20" :key="i" class="bg-gray-400 w-full h-3 my-2" />
      <div class="bg-gray-400 w-60 h-3 mb-2"/>

      </div>
    </div>
    <Footer current-page="Blog" />
  </main>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';

export default {
  // eslint-disable-next-line vue/component-definition-name-casing
  name: 'post',
  components: {
    NavBar,
    Footer,
  },
  async asyncData({ $content, params, error }) {
    const slug = params.pathMatch;

    const posts = await $content('posts')
      .search('slug', slug)
      .fetch()
      .catch((err) => {
        error({
          statusCode: 500,
          message: 'Something went wrong. Please try again.',
          error: err,
        });
      });

    const post = posts?.find((post) => post.slug === slug);

    if (!post) {
      return error({ statusCode: 404, message: 'Post not found' });
    }

    return {
      post
    };
  },
  head() {
    return {
      title: this.post.title || 'Christian Lisle',
    };
  },
};
</script>

