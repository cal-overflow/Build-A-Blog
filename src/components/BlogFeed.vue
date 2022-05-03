<template>
  <div id="post-feed">
    <div class="max-w-screen-lg mx-auto">
      <div class="bg-card-light dark:bg-card-dark m-6 p-6 shadow-md dark:shadow-shadow-dark hover:shadow-none hover:rounded motion-safe:animate-fade-in-fast transition">
        <div v-if="category">
          <p class="text-center md:text-left text-3xl font-bold">{{category.title}}</p>
          <p class="text-center md:text-left text-md">{{category.description}}</p>
        </div>
        <p v-else class="text-center text-3xl font-bold">Blog</p>
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
        :class="`bg-card-light dark:bg-card-dark m-6 px-6 hover:bg-extra-gray-light dark:hover:bg-extra-gray-dark hover:rounded shadow-md hover:shadow-none md:col-span-2 cursor-pointer transition ${loadingStyle}`"
        @mousedown="getPosts"
      >
        <p class="m-4 underline hover:no-underline text-center text-lg">
          {{isFetchingPosts ? 'Loading' : 'Load more'}}
        </p>
      </div>
    </div>

    <div v-else-if="isFetchingPosts" class="max-w-screen-lg mx-auto grid md:grid-cols-2">
      <post-preview
        v-for="(n, i) in postCount"
        :key="i"
        :index="i"
        :last="i === (postCount - 1)"
      />
    </div>
    
    <div v-else class="max-w-screen-lg mx-auto grid md:grid-cols-2">
      <div
        class="bg-card-light dark:bg-card-dark m-6 p-6 hover:rounded shadow-md dark:shadow-shadow-dark hover:shadow-none motion-safe:animate-fade-in transition col-span-2"
      >
        <p class="text-center md:text-left text-2xl font-bold mt-2">No posts 😴</p>
        <p class="text-center md:text-left">No posts have been written {{ category ? 'for this category' : '😬' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Divider from '@/components/Divider.vue';
import PostPreview from '@/components/previews/Post.vue';

export default {
  name: 'blog-feed',
  components: {
    Divider,
    PostPreview,
  },
  props: {
    category: {
      default: undefined,
      type: Object,
      required: false,
    }
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

      let fetchPosts = this.$content('posts')
        .sortBy('id', 'desc')
        .limit(totalPosts + 1);
      
      if (this.category) {
        fetchPosts = fetchPosts.where({categories: { $contains: this.category.title }});
      }
        
      const tempPosts = await fetchPosts.fetch()
        .catch((err) => {
          this.$nuxt.error({
            statusCode: 500,
            message: 'Something went wrong fetching posts',
            error: err,
          });
        });

      if (tempPosts) {
        this.isMorePosts = tempPosts.length > totalPosts;
        if (this.isMorePosts) tempPosts.pop(); // Remove last blog post

        this.posts = tempPosts;
        this.page++;
        this.isFetchingPosts = false;
      }
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
