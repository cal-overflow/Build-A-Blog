<template>
  <div class="max-w-screen-lg mx-auto">
    <card id="introduction-card" class="md:pt-3">
      <div class="max-w-sm md:w-2/5 lg:w-1/3 mx-auto md:my-auto">
        <img :src="image" class="rounded-full motion-safe:animate-blur-fade-in-fast transition" alt="Headshot" />
      </div>
      <div class="w-full md:w-3/5 lg:w-2/3 m-4 xs:mb-12 md:mb-0">
        <nuxt-content
          :document="metadata"
          class="prose prose-a:underline hover:prose-a:no-underline prose-a:text-primary-light dark:prose-invert dark:prose-a:text-primary-dark leading-normal prose-code:before:content-none prose-code:after:content-none transition" 
        />
      </div>
    </card>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 m-6 max-w-screen-lg flex-wrap md:flex-nowrap">
      <content-card
        v-for="(item, i) in content"
        :key="item.title"
        :content="item"
        :class="`motion-safe:animate-fade-in ${i == content.length - 1 && i % 2 == 0 ? 'md:col-span-2' : '' }`"
      />
    </div>
  </div>
</template>

<script>
import Card from '@/components/cards/Card.vue';
import ContentCard from '@/components/cards/ContentCard.vue';

export default {
  name: 'home-view',
  components: {
    Card,
    ContentCard,
  },
  props: {
    metadata: {
      type: Object,
      required: true
    },
    content: {
      type: Array,
      required: true
    },
    dir: {
      type: String,
      required: true
    }
  },
  computed: {
    image() {
      const imageUri = this.metadata.viewProperties.headshotImage;

      if (imageUri.includes('http://') || imageUri.includes('https://')) {
        return imageUri;
      }
      else return require(`~/content/${this.dir}/${imageUri}`);
    }
  }
};
</script>
