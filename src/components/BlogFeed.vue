<template>
  <div>
    <div class="max-w-screen-lg mx-auto">
      <div class="m-6 p-6 m-6 bg-gray-100 shadow-md hover:shadow-none hover:rounded">
        <p class="text-center text-3xl font-bold">Blog</p>
      </div>
    </div>
    <divider />

    <div v-if="posts.length" class="max-w-screen-lg mx-auto grid md:grid-cols-2">
      <post-preview
        v-for="(post, i) in posts"
        :key="i"
        :ref="post.slug"
        :post="post"
        :index="i"
        :last="i === (posts.length - 1)"
      />

      <div
        v-if="isMorePosts"
        ref="loadMorePosts"
        :class="`m-6 px-6 bg-gray-200 hover:bg-gray-300 hover:rounded shadow-md hover:shadow-none md:col-span-2 cursor-pointer ${loadingStyle}`"
        @mousedown="getPosts"
      >
        <p class="m-4 hover:underline text-center text-lg">
          {{isFetchingPosts ? 'Loading' : 'Load more'}}
        </p>
      </div>
    </div>

    <div v-else class="max-w-screen-lg mx-auto grid md:grid-cols-2">
      <post-preview
        v-for="(n, i) in postCount"
        :key="i"
        :index="i"
        :last="i === (postCount - 1)"
      />
    </div>
  </div>
</template>

<script>
import Divider from '@/components/Divider.vue';
import PostPreview from '@/components/previews/Post.vue';

export default {
  name: 'BlogFeed',
  components: {
    Divider,
    PostPreview,
  },
  data: () => ({
    posts: [],
    page: 1,
    postCount: 10,
    isFetchingPosts: true,
    isMorePosts: false,
  }),
  computed: {
    loadingStyle() {
      return this.isFetchingPosts ? 'animate-pulse' : '';
    },
  },
  async created() {
    this.startScrollListener();
    await this.getPosts();
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    async getPosts() {
      this.isFetchingPosts = true;
      const totalPosts = (this.page * this.postCount);

      const tmp = await this.$content('posts')
      .sortBy('createdAt', 'desc')
      .limit(totalPosts + 1)
      .fetch();

      this.isMorePosts = tmp.length > totalPosts;
      if (this.isMorePosts) tmp.pop(); // Remove last blog post

      this.posts = tmp;
      this.page++;
      this.isFetchingPosts = false;
    },
    startScrollListener() {
      window.addEventListener('scroll', this.handleScroll);
    },
    async handleScroll() {
      const totalHeight = document.height || document.body.offsetHeight;

      if (!totalHeight || this.isFetchingPosts) return;

      if (window.scrollY >= (0.5 * totalHeight)) {
        if (this.isMorePosts) await this.getPosts();
      }
    }
  }
};
</script>
