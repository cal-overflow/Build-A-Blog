<template>
  <div id="post-feed">
    <div class="max-w-screen-lg mx-auto">
      <div class="bg-card-light dark:bg-card-dark m-6 p-6 shadow-md dark:shadow-shadow-dark hover:shadow-none hover:rounded motion-safe:animate-fade-in-fast transition">
        <div class="flex sm:justify-between text-center sm:text-left">
          <p class="grow text-3xl font-bold">{{metadata.title}}</p>
        </div>
        <p v-if="metadata.description" class="text-center sm:text-left">{{metadata.description}}</p>
      </div>
    </div>
    <divider />

    <div v-if="posts.length" class="max-w-screen-lg mx-auto grid md:grid-cols-2">
      <post-preview
        v-for="(post, i) in posts"
        :key="i"
        :ref="post.slug"
        :full-width="i % 3 === 0 || ((i === (posts.length - 1)) && i % 3 === 1)"
        :is-reversed="i % 6 === 0 || ((i === (posts.length - 1)) && (i - 1) % 6 !== 0)"
        :post="post"
        :dir="dir"
      />

      <div
        v-if="isMorePosts"
        ref="loadMorePosts"
        :class="`bg-card-light dark:bg-card-dark m-6 px-6 hover:bg-extra-gray-light dark:hover:bg-extra-gray-dark hover:rounded shadow-md hover:shadow-none md:col-span-2 cursor-pointer motion-safe:animate-fade-in-slow transition`"
        @mousedown="getPosts"
      >
        <p class="m-4 underline hover:no-underline text-center text-lg">
          Load more
        </p>
      </div>
      <div
        v-if="!isMorePosts"
        ref="rss-card"
        id="rss-card"
        :class="`bg-card-light dark:bg-card-dark m-6 px-6 hover:bg-extra-gray-light dark:hover:bg-extra-gray-dark hover:rounded shadow-md hover:shadow-none md:col-span-2 cursor-pointer motion-safe:animate-fade-in-slow transition`"
        @mouseup="openRSSLink"
      >
          
        <p class="m-4 text-center text-xs md:text-base">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-auto mx-auto">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          Subscribe to be notified when a new post is written in this section.
        </p>
      </div>

    </div>
    
    <div v-else class="max-w-screen-lg mx-auto grid md:grid-cols-2">
      <div
        class="bg-card-light dark:bg-card-dark m-6 p-6 hover:rounded shadow-md dark:shadow-shadow-dark hover:shadow-none motion-safe:animate-fade-in transition col-span-2"
      >
        <p class="text-center md:text-left text-2xl font-bold mt-2">No posts 😴</p>
        <p class="text-center md:text-left">No posts have been written for this section</p>
      </div>
    </div>
  </div>
</template>

<script>
import Divider from '@/components/helpers/Divider.vue';
import PostPreview from '@/components/previews/Post.vue';

export default {
  name: 'post-feed',
  components: {
    Divider,
    PostPreview,
  },
  props: {
    metadata: {
      default: () => ({
        title: 'Feed',
        description: undefined
      }),
      type: Object,
      required: false,
    },
    content: {
      default: undefined,
      type: Array,
      required: true,
    },
    dir: {
      type: String,
      required: true
    },
  },
  data: () => ({
    posts: [],
    page: 1,
    postCount: 10,
    isMorePosts: false,
  }),
  created() {
    this.startScrollListener();
    this.getPosts();
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    // TODO - come back to this and implement fake loading more posts as you scroll
    getPosts() {
      const totalPosts = (this.page * this.postCount);
      const tempPosts = this.content;

      if (tempPosts) {
        this.isMorePosts = tempPosts.length > totalPosts;
        if (this.isMorePosts) tempPosts.pop(); // Remove last post

        this.posts = tempPosts;
        this.page++;
      }
    },
    startScrollListener() {
      window.addEventListener('scroll', this.handleScroll);
    },
    async handleScroll() {
      const totalHeight = document.height || document.body.offsetHeight;

      if (!totalHeight) return;

      if (window.scrollY >= (0.5 * totalHeight)) {
        if (this.isMorePosts) await this.getPosts();
      }
    },
    openRSSLink() {
      window.open(
      `${this.currentRoute}.xml`, '_blank');
    }
  },
  computed: {
    currentRoute() {
      return this.$route.fullPath;
    },
  }
};
</script>
