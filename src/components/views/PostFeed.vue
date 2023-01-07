<template>
  <div id="post-feed">
    <div class="max-w-screen-lg mx-auto">
      <div class="bg-card-light dark:bg-card-dark m-6 p-6 shadow-md dark:shadow-shadow-dark hover:shadow-none hover:rounded motion-safe:animate-fade-in-fast transition">
        <p class="text-center text-3xl font-bold">{{title}}</p>
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
      />

      <div
        v-if="isMorePosts"
        ref="loadMorePosts"
        :class="`bg-card-light dark:bg-card-dark m-6 px-6 hover:bg-extra-gray-light dark:hover:bg-extra-gray-dark hover:rounded shadow-md hover:shadow-none md:col-span-2 cursor-pointer transition`"
        @mousedown="getPosts"
      >
        <p class="m-4 underline hover:no-underline text-center text-lg">
          Load more
        </p>
      </div>
    </div>
    
    <div v-else class="max-w-screen-lg mx-auto grid md:grid-cols-2">
      <div
        class="bg-card-light dark:bg-card-dark m-6 p-6 hover:rounded shadow-md dark:shadow-shadow-dark hover:shadow-none motion-safe:animate-fade-in transition col-span-2"
      >
        <p class="text-center md:text-left text-2xl font-bold mt-2">No posts 😴</p>
        <p class="text-center md:text-left">No posts have been written for this tag</p>
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
    title: {
      default: 'Feed',
      type: String,
      required: false,
    },
    content: {
      default: undefined,
      type: Array,
      required: true,
    }
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
    }
  }
};
</script>
