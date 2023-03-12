<template>
  <div class="max-w-screen-lg mx-auto">
    <div
      class="bg-card-light dark:bg-card-dark m-6 p-6 shadow-md dark:shadow-shadow-dark hover:shadow-none hover:rounded motion-safe:animate-fade-in-fast transition">
      <p class="text-center text-3xl font-bold">Tags</p>
    </div>
    <divider />

    <div v-if="tags && tags.length">
      <tag-preview v-for="(tag, i) in tags" :key="tag.slug" :tag="tag" :index="i" />
    </div>

    <div v-else-if="!isDoneFetchingTags">
      <tag-preview v-for="(n, i) in 3" :key="`tag-lazy-loader-${n}`" :index="i" />
    </div>

    <div v-else
      class="bg-card-light dark:bg-card-dark m-6 p-6 hover:rounded shadow-md dark:shadow-shadow-dark hover:shadow-none motion-safe:animate-fade-in transition col-span-2">
      <p class="text-center md:text-left text-2xl font-bold mt-2">No tags 😴</p>
      <p class="text-center md:text-left">There are not currently any tags</p>
    </div>
  </div>
</template>
  
<script>
import Divider from '@/components/misc/Divider.vue';
import TagPreview from '@/components/previews/Tag.vue';

export default {
  name: 'tags-feed',
  components: {
    TagPreview,
    Divider,
  },
  data: () => ({
    tags: [],
    isDoneFetchingTags: false,
  }),
  // TODO - come back to this
  // async fetch() {
  //   const content = await this.$content(this.path)
  //     .fetch()
  //     .catch((err) => {
  //       this.$error({
  //         statusCode: 500,
  //         message: 'Something went wrong while fetching tags',
  //         error: err
  //       });
  //     });

  //   this.tags = content;
  //   this.isDoneFetchingTags = true;
  // },
};
</script>
