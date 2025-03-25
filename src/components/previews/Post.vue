<template>
  <card v-if="post" :class="`post-preview-card ${getCardStyle}`">
    <div :class="getImageContainerStyle" style="aspect-ratio: 1 / 1;">
      <nuxt-link ref="feature-image" :to="targetLink" :class="`w-full h-full motion-safe:animate-blur-fade-in-slow`">
        <img :src="image" :class="`${imageStyling}`" />
      </nuxt-link>
    </div>

    <div :class="getPostInfoContainerStyle">
      <nuxt-link ref="title" :to="targetLink" class="font-bold text-lg hover:underline">
        {{post.title}}
      </nuxt-link>
      <div class="text-xs text-extra-gray-dark dark:text-extra-gray-light">
        {{post.date}}
      </div>
      <div :class="showMinimalContent ? 'hidden md:block' : ''">
        <nuxt-content ref="excerpt" :document="excerpt" :editable="false" :class="`prose leading-snug prose-a:text-inherit prose-a:no-underline dark:prose-invert transition pointer-events-none prose-code:before:content-none prose-code:after:content-none prose-details prose-details-light dark:prose-details-dark prose-blockquote-light dark:prose-blockquote-dark ${showMinimalContent ? 'minimal-preview-text' : ''}`" />
        <nuxt-link ref="continue-reading" :to="targetLink" :class="`text-extra-gray-dark dark:text-extra-gray-light font-thin text-sm underline hover:no-underline transition ${showMinimalContent ? 'hidden md:block': ''}`">
          {{post.isNestedSection ? 'View posts' : 'Continue reading' }}
        </nuxt-link>
      </div>
    </div>
  </card>

  <card v-else ref="lazy-load-post-preview" :class="`post-preview-card ${getCardStyle}`">
    <div :class="getImageContainerStyle" style="aspect-ratio: 1 / 1;">
      <div class="bg-gray-500 object-cover w-full h-full" />
    </div>

    <div :class="getPostInfoContainerStyle">
      <div class="bg-gray-500 dark:bg-white w-64 h-4 transition" />

      <div v-for="i in 6" :key="i" class="bg-gray-400 w-full h-3 my-2"/>
      <div class="bg-gray-400 w-48 h-3 mb-2"/>
      <div class="bg-gray-300 w-24 h-3" />
    </div>
  </card>
</template>

<script>
import Card from '@/components/cards/Card.vue';

export default {
  name: 'post-preview',
  components: {
    Card,
  },
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
    sectionMetadata: {
      type: Object,
      required: true
    },
    classes: {
      type: String,
      default: ''
    }
  },
  computed: {
    targetLink() {
      if (this.post.isNestedSection) {
        return `${this.post.dir}`;
      }
      return `${this.post.dir}/${this.post.slug}`;
    },
    excerpt() {
      return {
        body: this.post.excerpt
      };
    },
    getCardStyle() {
      let style = `${this.classes}`;

      if (!this.post)
        style += ' motion-safe:animate-pulse';

      if (this.isReversed)
        style += ' md:flex-row-reverse';

      if (this.fullWidth) {
        style += ' md:col-span-2 md:flex';
      }  else {
        style += ' md:col-span-1 md:flex-col';
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
      // Loads the feature image for a post. If the post doesn't have an image, uses a placeholder.
      if (this.post.img?.includes('http://') || this.post.img?.includes('https://')) {
        return this.post.img;
      }
      let img;

      // Try loading the image from the same path in `src/content`
      try {
        const currentPathFormatted = this.$route.path.replace(/^\/|\/$/g, '');
        img = require(`~/content/${currentPathFormatted}/${this.post.img}`);
      }
      catch {};

      if (img) return img;


      // Use a placeholder image
      try {
        img = require('~/content/placeholder.png');
      }
      catch {
        img = 'https://cal-overflow.dev/misc/placeholder.png';
      }

      return img;
    },
    imageStyling() {
      const classes = 'w-full h-full';

      // default values
      let objectFit = 'cover';
      let rounding = 'none';

      const imageStyling = this.sectionMetadata?.viewProperties?.imageStyling;

      if (imageStyling) {
        if (imageStyling.objectFit) {
          objectFit = imageStyling.objectFit;
        }
        if (imageStyling.rounding) {
          rounding = imageStyling.rounding;
        }
      }

      return `${classes} object-${objectFit} rounded-${rounding}`;
    },
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
