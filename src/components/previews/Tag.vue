<template>
  <div 
    v-if="tag" 
    class="tag-preview-card bg-card-light dark:bg-card-dark m-6 p-6 hover:rounded shadow-md dark:shadow-shadow-dark hover:shadow-none motion-safe:animate-fade-in transition"
  >
    <nuxt-link ref="title" :to="`/tags/${tag.slug}`" class="font-bold text-2xl hover:underline">
      {{tag.title}}
    </nuxt-link>
    <p class="text-md">{{tag.description}}</p>
    <br>
      <divider width="w-4/5"/>
      <div v-if="latestPosts.length" class="relative">
        <p class="text-center text-lg text-primary-light dark:text-primary-dark font-bold">Latest Posts</p>
        <post-preview 
          :post="latestPosts[previewedPostIndex]"
          :full-width="true"
          :show-minimal-content="true"
          :is-reversed="index % 2 === 0"
          :classes="`shadow-none p-0 m-0 md:p-4 md:m-4`"
          @mouseenter.native="pauseInterval"
          @mouseleave.native="resumeInterval"
        />

        <div v-if="latestPosts.length > 1">
          <div class="flex flex-center justify-center gap-2 pb-5">
            <div
              v-for="(post, i) in latestPosts" 
              :key="i"
              class="w-1/6 md:w-1/12 py-4 md:py-0 bg-card-light dark:bg-card-dark h-4 cursor-pointer relative"
              @mousedown="setpostBeingPreviewedIndex(i)"
              @mouseenter="toolTipPostIndex=i"
              @mouseleave="toolTipPostIndex=undefined"
            >
              <div class="h-3 border-b-2 border-extra-gray-dark dark:border-extra-gray-light relative">
                <div class="bg-primary-light dark:bg-primary-dark h-1 absolute bottom-0.5" :style="`width: ${i === previewedPostIndex ? previewPercentage : 0}%;`"></div>
              </div>
              <tool-tip
                v-show="toolTipPostIndex === i"
                :ref="post.title"
                :text="post.title"
                :max-length="65"
                class="absolute left-1/2 transform -translate-x-1/2 invisible md:visible"
              />
            </div>
          </div>
          <nuxt-link ref="view-tag" :to="`/tags/${tag.slug}`" class="text-extra-gray-dark dark:text-extra-gray-light text-md underline hover:no-underline transition">
            View all posts
          </nuxt-link>
        </div>
      </div>
      <div v-else>
        <p class="text-md">There are not currently any posts for this tag</p>
      </div>
  </div>
  <div v-else ref="lazy-load-tag-preview" class="motion-safe:animate-pulse tag-preview-card bg-card-light dark:bg-card-dark m-6 p-6 hover:rounded shadow-md dark:shadow-shadow-dark hover:shadow-none motion-safe:animate-fade-in transition">
    <div class="bg-gray-500 dark:bg-white w-32 h-4 transition" />
    <div class="bg-gray-400 w-64 h-2 my-2"/>
    <br>
    <divider width="w-4/5"/>
    <div class="bg-gray-300 w-24 h-3 mx-auto" />
    <post-preview 
      :full-width="true"
      :show-minimal-content="true"
      :is-reversed="index % 2 === 0"
      :classes="`shadow-none p-0 m-0 md:p-4 md:m-4`"
    />
  </div>
</template>

<script>
import Divider from '@/components/helpers/Divider.vue';
import PostPreview from '@/components/previews/Post.vue';
import ToolTip from '@/components/helpers/ToolTip.vue';

export default {
  name: 'tag-preview',
  components: { Divider, PostPreview, ToolTip },
  props: {
    tag: {
      type: Object,
      default: undefined,
      required: false,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    latestPosts: [],
    previewedPostIndex: 0,
    intervalUpdateDuration: 60,
    timePerPostPreview: 6000,
    timeSinceLastSwitch: 0,
    intervalID: undefined,
    toolTipPostIndex: undefined,
  }),
  computed: {
    previewPercentage() {
      return (this.timeSinceLastSwitch / this.timePerPostPreview) * 100;
    },
  },
  async created() {
    await this.getLatestPosts();
  },
  methods: {
    async getLatestPosts() {
      if (!this.tag) return;

      const posts = await this.$content('posts')
        .where({ tags: { $contains: this.tag.title } })
        .sortBy('id', 'desc')
        .limit(4)
        .fetch()
        .catch();

      this.latestPosts = posts;
      this.intervalID = setInterval(this.updatePreviewProgress, this.intervalUpdateDuration);
    },
    updatePreviewProgress() {
      if (this.timeSinceLastSwitch >= this.timePerPostPreview) {
        this.previewedPostIndex++;
        this.previewedPostIndex %= this.latestPosts.length;
        this.timeSinceLastSwitch = 0;
      }
      else {
        this.timeSinceLastSwitch += this.intervalUpdateDuration;
      }
    },
    setpostBeingPreviewedIndex(i) {
      this.previewedPostIndex = i;
      clearInterval(this.intervalID);
      this.timeSinceLastSwitch = 0;
      this.intervalID = setInterval(this.updatePreviewProgress, this.intervalUpdateDuration);
    },
    pauseInterval() {
      clearInterval(this.intervalID);
      this.intervalID = undefined;
    },
    resumeInterval() {
      this.intervalID = setInterval(this.updatePreviewProgress, this.intervalUpdateDuration);
    }
  }
};
</script>
