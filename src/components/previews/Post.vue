<template>
  <div v-if="post" :class="`post-preview-card ${getCardStyle}`">
    <div :class="getImageContainerStyle" style="aspect-ratio: 1 / 1;">
      <nuxt-link ref="feature-image" :to="`${currentRoute}/${post.slug}`" :class="`w-full h-full motion-safe:animate-blur-fade-in-slow`">
        <img :src="image" class="object-cover w-full h-full" />
      </nuxt-link>
    </div>

    <div :class="getPostInfoContainerStyle">
      <nuxt-link ref="title" :to="`${currentRoute}/${post.slug}`" class="font-bold text-lg hover:underline">
        {{post.title}}
      </nuxt-link>
      <div :class="showMinimalContent ? 'hidden md:block' : ''">
        <nuxt-content ref="excerpt" :document="excerpt" :editable="false" :class="`prose leading-snug prose-a:text-inherit prose-a:no-underline dark:prose-invert transition ${showMinimalContent ? 'minimal-preview-text' : ''}`" />
        <nuxt-link ref="continue-reading" :to="`${currentRoute}/${post.slug}`" :class="`text-extra-gray-dark dark:text-extra-gray-light font-thin text-sm underline hover:no-underline transition ${showMinimalContent ? 'hidden md:block': ''}`">
          Continue reading
        </nuxt-link>
      </div>
    </div>
  </div>

  <div v-else ref="lazy-load-post-preview" :class="`post-preview-card ${getCardStyle}`">
    <div :class="getImageContainerStyle" style="aspect-ratio: 1 / 1;">
      <div class="bg-gray-500 object-cover w-full h-full" />
    </div>

    <div :class="getPostInfoContainerStyle">
      <div class="bg-gray-500 dark:bg-white w-64 h-4 transition" />

      <div v-for="i in 6" :key="i" class="bg-gray-400 w-full h-3 my-2"/>
      <div class="bg-gray-400 w-48 h-3 mb-2"/>
      <div class="bg-gray-300 w-24 h-3" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'post-preview',
  props: {
    post: {
      type: Object,
      default: undefined,
      required: false,
    },
    dir: {
      type: String,
      required: true
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    isReversed: {
      type: Boolean,
      default: false
    },
    showMinimalContent: {
      type: Boolean,
      default: false
    },
    classes: {
      type: String,
      default: ''
    }
  },
  computed: {
    currentRoute() {
      return this.$route.fullPath;
    },
    excerpt() {
      return {
        body: this.post.excerpt
      };
    },
    getCardStyle() {
      let style = `bg-card-light dark:bg-card-dark m-6 p-6 hover:rounded shadow-md dark:shadow-shadow-dark hover:shadow-none motion-safe:animate-fade-in transition ${this.classes}`;

      if (!this.post)
        style += ' motion-safe:animate-pulse';

      if (this.isReversed)
        style += ' md:flex-row-reverse';

      if (this.fullWidth) {
        style += ' md:col-span-2 md:flex';
      }  else {
        style += ' md:col-span-1';
      }

      return style;
    },
    getImageContainerStyle() {
      // aspect-square seems to not work as expected, so I have also added style tags where needed
      return `aspect-square overflow-hidden ${this.fullWidth ? 'md:w-2/5' : ''}`;
    },
    getPostInfoContainerStyle() {
      return `mt-2 ${this.fullWidth ? 'md:w-3/5 md:m-4' : ''}`;
    },
    image() {
      if (this.post.img.includes('http://') || this.post.img.includes('https://')) {
        return this.post.img;
      }
      else return require(`~/content/${this.dir}/${this.post.img}`);
    }
  }
};
</script>

<style scoped>
.minimal-preview-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
          line-clamp: 5; 
  -webkit-box-orient: vertical;
}
</style>
