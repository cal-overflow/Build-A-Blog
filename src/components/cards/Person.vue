<template>
  <div class="max-w-screen-lg mx-auto">
    <div id="person-card" class="bg-card-light dark:bg-card-dark m-6 p-4 flex flex-wrap md:flex-nowrap shadow-lg dark:shadow-shadow-dark hover:shadow-none hover:rounded motion-safe:animate-fade-in-fast transition">
      <div class="max-w-sm md:w-2/5 lg:w-1/3 mx-auto md:my-auto">
        <img :src="image" class="rounded-full motion-safe:animate-blur-fade-in-fast transition" alt="Headshot" />
      </div>
      <div class="w-full md:w-3/5 lg:w-2/3 m-4 xs:mb-12 md:mb-0">
        <slot />
      </div>
    </div>
  </div>
</template>


<script>
import Divider from '@/components/helpers/Divider.vue';
import PostPreview from '@/components/previews/Post.vue';
import ToolTip from '@/components/helpers/ToolTip.vue';
import PersonCard from '@/components/cards/Person.vue';

export default {
  name: 'person-card',
  Components: {
    Divider,
    PostPreview,
    PersonCard,
    ToolTip
  },
  props: {
    person: {
      type: Object,
      required: true
    },
    headshot: {
      type: String,
      required: true
    },
  },
  computed: {
    image() {
      if (this.headshot.includes('http://') || this.headshot.includes('https://')) {
        return this.post.img;
      }
      else return require(this.headshot);
    }
  }
};
</script>

<style scoped>
.animation-inline {
  display: inline-block;
  transform-origin: 70% 70%;
}
</style>
