<template>
  <div v-if="post" :class="getCardStyle">
    <div :class="`${isWideCard ? 'md:w-2/5' : ''} aspect-square`">
      <nuxt-link ref="feature-image" :to="`/posts/${post.slug}`" class="w-full h-full block hover:rounded">
        <img :src="image" class="object-cover w-full h-full" />
      </nuxt-link>
    </div>

    <div :class="`${isWideCard ? 'md:w-3/5 md:m-4' : ''} mt-2`">
      <nuxt-link ref="title" :to="`/posts/${post.slug}`" class="font-bold text-lg hover:underline">
        {{post.title}}
      </nuxt-link>
      <nuxt-content ref="excerpt" :document="excerpt" />
      <nuxt-link ref="continue-reading" :to="`/posts/${post.slug}`" class="text-gray-500 font-thin text-sm hover:underline">
        Continue reading
      </nuxt-link>
    </div>
  </div>

  <div v-else :class="getCardStyle">
    <div :class="`${isWideCard ? 'md:w-2/5' : ''}`">
      <div class="bg-gray-500 w-full h-64" />
    </div>

    <div :class="`${isWideCard ? 'md:w-3/5 md:m-4' : ''} mt-2`">
      <div class="bg-gray-500 w-40 h-4" />

      <div v-for="i in 6" :key="i" class="bg-gray-400 w-full h-3 my-2"/>
      <div class="bg-gray-400 w-48 h-3 mb-2"/>
      <div to="/" class="bg-gray-300 w-24 h-3" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostPreview',
  props: {
    post: {
      type: Object,
      default: undefined,
      required: false,
    },
    index: {
      type: Number,
      default: 0,
    },
    last: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    excerpt() {
      return {
        body: this.post.excerpt
      };
    },
    isWideCard() {
      return this.index % 3 === 0 || (this.last && this.index % 3 === 1);
    },
    getCardStyle() {
      const prevIndex = this.index - 1;
      let style = 'm-6 p-6 bg-gray-100 hover:rounded shadow-md hover:shadow-none';

      if (!this.post)
        style += ' animate-pulse';

      if (this.index % 6 === 0 || (this.last && prevIndex & 6 !== 0))
        style += ' md:flex-row-reverse';

      if (this.isWideCard)
        style += ' md:col-span-2 md:flex';

      else {
        style += ' md:col-span-1';
      }

      return style;
    },
    image() {
      if (this.post.img.includes('http://') || this.post.img.includes('https://')) {
        return this.post.img;
      }
      else return `/blog-images/feature/${this.post.img}`;
    }
  }
};
</script>