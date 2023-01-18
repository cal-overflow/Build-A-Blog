<template>
  <div class="max-w-screen-lg mx-auto">
    <div v-if="post" id="post-card" class="bg-card-light dark:bg-card-dark m-0 md:m-6 p-4 flex flex-wrap shadow-lg dark:shadow-shadow-dark hover:shadow-none hover:rounded motion-safe:animate-fade-in transition">
      <div class="w-full p-4">
        <div v-if="!isEditing">
          <p id="post-title" class="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 !leading-tight">{{ post.title }}</p>

          <div class="text-extra-gray-dark dark:text-extra-gray-light transition">
            <p id="post-metadata">{{ post.date }}
              <span v-if="post.tags.length">
                <span class="hidden md:inline">/</span>
                <br class="md:hidden" />
                <span 
                  v-for="(tag, i) in post.tags" 
                  :key="`tags-${tag}`"
                >
                  <nuxt-link :to="`/tags/${tag.toLowerCase().replace(' ', '-')}`" class="hover:underline">{{ tag }}</nuxt-link>{{ (i + 1) === post.tags.length ? '' : ', ' }}
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
          class="prose m-4 mx-auto max-w-none prose-img:w-max prose-img:max-h-[100vh] prose-img:mx-auto prose-a:underline hover:prose-a:no-underline prose-a:text-primary-light dark:prose-invert dark:prose-a:text-primary-dark transition"
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
        <div class="bg-gray-400 w-60 h-3 mb-2" />

      </div>
    </div>
  </div>
</template>

<script>
import Divider from '@/components/helpers/Divider.vue';

export default {
  name: 'post-view',
  components: {
    Divider
  },
  props: {
    dir: {
      type: String,
      required: true
    }
  },
  data: () => ({
    post: undefined,
    isEditing: false,
    isDevMode: process.env.NODE_ENV === 'development'
  }),
  async fetch() {
    const currentRoute = this.$route.fullPath;
    const lastIndex = currentRoute.lastIndexOf('/');
    const directory = currentRoute.slice(0, lastIndex).substring(1);
    const slug = currentRoute.slice(lastIndex + 1);

    const posts = await this.$content(directory)
      .search('slug', slug)
      .fetch();

    this.post = posts?.find((post) => post.slug === slug);
    this.isEditing = false;
    this.isDevMode = process.env.NODE_ENV === 'development';
  },
  computed: {
    image() {
      if (!this.post) return undefined;
      if (this.post.img.includes('http://') || this.post.img.includes('https://')) {
        return this.post.img;
      }
      else return require(`~/content/${this.dir}/${this.post.img}`);
    }
  }
};
</script>

<style>
@media only screen and (max-width: 600px) {
  .youtube-embed {
    width: 100%;
  }
}
@media only screen and (min-width: 601px) {
  .youtube-embed {
    width: 70%;
  }
}
.youtube-embed {
  height: auto;
  aspect-ratio: 16/ 9;
  margin: 0 auto;
}
</style>
