<template>
  <div class="max-w-screen-lg mx-auto">
    <card id="post-card" class="m-0 md:m-6 p-4 flex flex-wrap">
      <div class="w-full p-4">
        <div v-if="!isEditing">
          <p id="post-title" class="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 !leading-tight">{{ content.title }}</p>

          <div class="text-extra-gray-dark dark:text-extra-gray-light transition">
            <p id="post-metadata">{{ content.date }}
              <span v-if="content.tags.length">
                <span class="hidden md:inline">/</span>
                <br class="md:hidden" />
                <span
                  v-for="(tag, i) in content.tags"
                  :key="`tags-${tag}`"
                >
                  <nuxt-link :to="`/${dir}?tag_filter=${encodeURIComponent(tag)}`" class="hover:underline">{{ tag }}</nuxt-link>{{ (i + 1) === content.tags.length ? '' : ', ' }}
                </span>
              </span>
            </p>
          </div>
        </div>

        <div v-if="!isEditing">
          <img id="post-feature-image" :src="image" :class="featureImageStyling" />

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
          :document="content"
          class="prose m-4 mx-auto max-w-none prose-img:w-max prose-img:max-h-[100vh] prose-img:mx-auto prose-a:underline hover:prose-a:no-underline prose-a:text-primary-light dark:prose-invert dark:prose-a:text-primary-dark transition prose-code:before:content-none prose-code:after:content-none prose-details prose-details-light dark:prose-details-dark prose-blockquote-light dark:prose-blockquote-dark"
          @startEdit="isEditing = true"
          @endEdit="isEditing = false"
        />
      </div>
    </card>
    <card id="post-interaction-card" class="m-0 md:m-6 p-4 flex flex-wrap">
      <div class="w-full flex justify-between">
        <nuxt-link :to="`/${dir}`">
          <button
            class="p-2 hover:bg-extra-gray-light dark:hover:bg-extra-gray-dark rounded-sm transition duration-250">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            All posts
          </button>
        </nuxt-link>
        <button
          @mouseup="sharePost"
          :disabled="isPostUrlCopied"
          class="p-2 hover:bg-extra-gray-light dark:hover:bg-extra-gray-dark rounded-sm transition duration-250">
          {{ isPostUrlCopied ? 'URL Copied' : 'Share' }}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </button>
      </div>
    </card>
  </div>
</template>

<script>
import Card from '@/components/cards/Card.vue';
import Divider from '@/components/misc/Divider.vue';

export default {
  name: 'post-view',
  components: {
    Card,
    Divider,
  },
  props: {
    dir: {
      type: String,
      required: true
    },
    content: {
      default: undefined,
      type: Object,
      required: true,
    },
  },
  data: () => ({
    isEditing: false,
    isDevMode: process.env.NODE_ENV === 'development',
    isPostUrlCopied: false,
  }),
  computed: {
    image() {
      const fallbackPlaceholder = 'https://cal-overflow.dev/misc/placeholder.png';

      if (!this.content) {
        return fallbackPlaceholder;
      }

      // Loads the feature image for a post. If the post doesn't have an image, uses a placeholder.
      if (this.content.img?.includes('http://') || this.content.img?.includes('https://')) {
        return this.content.img;
      }
      let img;

      try {
        img = require(`~/content/${this.dir}/${this.content.img}`);
      }
      catch {};

      if (img) return img;


      // Use a placeholder image
      try {
        img = require('~/content/placeholder.png');
      }
      catch {
        img = fallbackPlaceholder;
      }

      return img;
    },
    featureImageStyling() {
      const classes = 'w-full md:w-3/4 3xl:w-3/4 mx-auto lg:mx-auto max-h-screen';

      // default values
      let objectFit = 'contain';
      let rounding = 'none';

      const featureImageStyling = this.content.viewProperties?.featureImageStyling;

      if (featureImageStyling) {
        if (featureImageStyling.objectFit) {
          objectFit = featureImageStyling.objectFit;
        }
        if (featureImageStyling.rounding) {
          rounding = featureImageStyling.rounding;
        }
      }

      return `${classes} object-${objectFit} rounded-${rounding}`;
    }
  },
  methods: {
    sharePost() {
      navigator.clipboard.writeText(window.location.href);
      this.isPostUrlCopied = true;

      setTimeout(() => {
        this.isPostUrlCopied = false;
      }, 10000);
    },
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
