<template>
  <main>
    <nav-bar current-page="Blog" />
    <div class="max-w-screen-lg mx-auto">
      <div v-if="post" id="post-card" class="bg-card-light dark:bg-card-dark m-0 md:m-6 p-4 flex flex-wrap shadow-lg dark:shadow-shadow-dark hover:shadow-none hover:rounded motion-safe:animate-fade-in transition">
        <div class="w-full p-4">
          <div v-if="!isEditing">
            <p id="post-title" class="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 !leading-tight">{{post.title}}</p>

            <div class="text-extra-gray-dark dark:text-extra-gray-light transition">
              <p id="post-metadata">{{post.date}}
                <span v-if="post.categories.length">
                  <span class="hidden md:inline">/</span>
                  <br class="md:hidden" />
                  <span
                    v-for="(category, i) in post.categories"
                    :key="`categories-${category}`"
                  >
                    <nuxt-link :to="`/category/${category.toLowerCase().replace(' ', '-')}`" class="hover:underline">{{category}}</nuxt-link>{{(i + 1) === post.categories.length ? '' : ', '}}
                  </span>
                </span>
              </p>
            </div>
          </div>

          <div v-if="!isEditing">
            <img id="post-feature-image" :src="image" class="object-contain w-full md:w-3/4 3xl:w-3/4 mx-auto lg:mx-auto max-h-screen" />
            
            <div v-if="isDevMode">
              <divider />
              <p class="text-sm text-center text-extra-gray-dark dark:text-extra-gray-light">
                <strong>You're in development mode 🧑‍💻</strong>
                <br />
                Double click anywhere on the post body below to edit
              </p>
              <divider />
            </div>
          </div>
          <nuxt-content
            id="post-content"
            :document="post"
            class="prose m-4 mx-auto max-w-none prose-img:w-max prose-img:mx-auto prose-a:underline hover:prose-a:no-underline prose-a:text-primary-light dark:prose-invert dark:prose-a:text-primary-dark transition"
            @startEdit="isEditing = true"
            @endEdit="isEditing = false"
          />
        </div>
      </div>

      <div v-else class="max-w-screen-lg mx-auto flex bg-card-light dark:bg-card-dark m-6 p-4 px-6 flex-wrap shadow-lg hover:shadow-none hover:rounded animate-pulse transition">
        <div class="w-full p-4">
          <div class="bg-white w-80 lg:w-96 h-16 mb-2" />
          <div class="bg-gray-300 w-60 h-4 mb-1" />

        <div class="bg-gray-500 w-full md:w-3/4 lg:w-8/12 mx-auto lg:mx-auto h-96 max-h-screen" />
        <div v-for="i in 20" :key="i" class="bg-gray-400 w-full h-3 my-2" />
        <div class="bg-gray-400 w-60 h-3 mb-2"/>

        </div>
      </div>
    </div>
    <back-to-top-button />
    <footer-bar current-page="Blog" />
  </main>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import BackToTopButton from '@/components/BackToTopButton.vue';
import FooterBar from '@/components/FooterBar.vue';

export default {
  name: 'post',
  components: {
    NavBar,
    BackToTopButton,
    FooterBar
  },
  async asyncData({ $content, params, error }) {
    const slug = params.pathMatch;

    const posts = await $content('posts')
      .search('slug', slug)
      .fetch()
      .catch((err) => {
        error({
          statusCode: 500,
          message: 'Something went wrong',
          error: err,
        });
      });

    const post = posts?.find((post) => post.slug === slug);

    if (!post) {
      return error({ statusCode: 404, message: 'This post could not be found' });
    }

    return {
      post,
      isEditing: false,
      isDevMode: process.env.NODE_ENV === 'development'
    };
  },
  head() {
    return {
      title: this.post.title || 'Christian Lisle',
    };
  },
  computed: {
    image() {
      if (!this.post) return undefined;
      if (this.post.img.includes('http://') || this.post.img.includes('https://')) {
        return this.post.img;
      }
      else return require(`~/assets/images/feature/${this.post.img}`);
    }
  }
};
</script>

<style>
.youtube-embed {
  width: 70%;
  height: auto;
  aspect-ratio: 16/ 9;
  margin: 0 auto;
}
</style>
