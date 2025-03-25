<template>
  <div id="post-feed">
    <div class="max-w-screen-lg mx-auto">
      <card>
        <div class="w-full">
          <div class="w-full flex sm:justify-between">
            <p class="grow text-3xl font-bold">{{metadata.title}}</p>
            <button class="dark:text-white rounded-lg" @click="isShowingFilter = !isShowingFilter">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>
            </button>
          </div>
          <div v-if="isShowingFilter">
            <divider class="mt-8" />
            <div class="flex justify-between">
              <p class="font-bold text-lg">Tags</p>
              <div v-if="metadata.tags && metadata.tags.length">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="inline w-8 h-8 cursor-pointer pr-2"
                    @click="enableAllTags"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="inline w-8 h-8 cursor-pointer pr-2 text-extra-gray-light dark:text-extra-gray-dark"
                    @click="disableAllTags"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </div>
            </div>
            <div v-if="metadata.tags && metadata.tags.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <button
                  v-for="tag in metadata.tags"
                  :key="tag"
                  :class="`m-4 rounded-lg flex items-center ${visibleTags.includes(tag) ? '' : 'text-extra-gray-light dark:text-extra-gray-dark'} transition duration-250`"
                  @click="toggleTag(tag)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="inline w-6 h-6 pr-2"
                  >
                    <path v-if="!visibleTags.includes(tag)" stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>

                  {{tag}}
                </button>
            </div>
            <div v-else>
              <p class="text-extra-gray-dark dark:text-extra-gray-light">No tags defined for this section</p>
            </div>

            <divider />
            <div>
              <p class="font-bold text-lg">Sort by</p>
              <div class="grid grid-cols-1 md:grid-cols-3">
                <button
                  v-for="sortingStrategy in sortingStrategies"
                  :key="sortingStrategy.key"
                  :class="`m-4 rounded-lg text-left md:text-center ${selectedSortingStrategy === sortingStrategy.key ? '' : 'text-extra-gray-light dark:text-extra-gray-dark'} transition duration-250`"
                  @click="sort(sortingStrategy)"
                >
                  {{sortingStrategy.title}}
                </button>
              </div>
            </div>
          </div>
          <nuxt-content
            v-if="!isShowingFilter"
            :document="metadata"
            class="prose mx-auto max-w-none prose-img:w-max prose-img:max-h-[100vh] prose-img:mx-auto prose-a:underline hover:prose-a:no-underline prose-a:text-primary-light dark:prose-invert leading-normal dark:prose-a:text-primary-dark transition prose-code:before:content-none prose-code:after:content-none prose-details prose-details-light dark:prose-details-dark prose-blockquote-light dark:prose-blockquote-dark"
          />
        </div>
      </card>
      <divider />

      <div v-if="filteredPosts.length" class="grid md:grid-cols-2">
        <post-preview
          v-for="(post, i) in filteredPosts" :key="i"
          :ref="post.slug"
          :full-width="i % 3 === 0 || ((i === (filteredPosts.length - 1)) && i % 3 === 1)"
          :is-reversed="i % 6 === 0 || ((i === (filteredPosts.length - 1)) && (i - 1) % 6 !== 0)"
          :post="post"
          :dir="dir"
          :section-metadata="metadata"
        />

        <div
          v-if="isMorePosts"
          @mousedown="getPosts"
        >
          <card
            ref="loadMorePosts"
            :class="`m-6 px-6 hover:bg-extra-gray-light dark:hover:bg-extra-gray-dark shadow-md hover:shadow-none md:col-span-2 cursor-pointer`"
          >
            <p class="m-4 underline hover:no-underline text-center text-lg">
              Load more
            </p>
          </card>
        </div>
      </div>

      <div v-else grid class="md:grid-cols-2">
        <card v-if="posts.length !== 0" class="col-span-2">
          <div class="w-full">
            <p class="text-center md:text-left text-2xl font-bold mt-2">No posts 🚫</p>
            <p class="text-center md:text-left">No posts in this section match the given filter.</p>
          </div>
        </card>

        <card v-else class="col-span-2">
          <div class="w-full">
            <p class="text-center md:text-left text-2xl font-bold mt-2">No posts 😴</p>
            <p class="text-center md:text-left">No posts have been written for this section.</p>
          </div>
        </card>
      </div>
      <div v-if="!isMorePosts || posts.length === 0" class="md:col-span-2" @mouseup="openRSSLink">
        <card
          id="rss-card"
          ref="rss-card"
          :class="`hover:bg-extra-gray-light dark:hover:bg-extra-gray-dark cursor-pointer`"
        >
          <p class="w-full text-center text-xs md:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-auto mx-auto">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            Subscribe via RSS to be notified when a new post is written in this section.
          </p>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import Divider from '@/components/misc/Divider.vue';
import Card from '@/components/cards/Card.vue';
import PostPreview from '@/components/previews/Post.vue';

export default {
  name: 'post-feed',
  components: {
    Card,
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
    visibleTags: [],
    sortedPosts: [],
    filteredPosts: [],
    page: 1,
    postCount: Infinity,
    isMorePosts: false,
    isShowingFilter: false,
    sortingStrategies: [
      {
        title: 'Newest first',
        key: 'descending-date',
      },
      {
        title: 'Oldest first',
        key: 'ascending-date',
      },
      {
        title: 'A-Z',
        key: 'ascending-alphabet',
      },
    ],
    selectedSortingStrategy: 'descending-date',
  }),
  computed: {
    currentRoute() {
      return this.$route.fullPath.split('?')[0];
    }
  },
  watch: {
    visibleTags(updatedVisibleTags) {
      this.computeFilteredPosts(updatedVisibleTags);
    },
  },
  created() {
    this.startScrollListener();
    this.getPosts();
    this.filteredPosts = [...this.posts];
    if (this.$route.query.tag_filter) {
      this.disableAllTags();
      this.visibleTags = [decodeURIComponent(this.$route.query.tag_filter)];
      this.isShowingFilter = true;
    }
    else this.enableAllTags();
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
    enableAllTags() {
      this.visibleTags = [...(this.metadata.tags ?? [])];
    },
    toggleTag(tag) {
      const index = this.visibleTags.indexOf(tag);
      if (index > -1) {
        this.visibleTags.splice(index, 1);
      }
      else this.visibleTags.push(tag);
    },
    disableAllTags() {
      this.visibleTags = [];
    },
    openRSSLink() {
      window.open(
      `${this.currentRoute}.xml`, '_blank');
    },
    computeFilteredPosts(visibleTags) {
      if (!this.metadata.tags || this.metadata.tags.length === 0) {
        this.filteredPosts = [...this.posts];
        return;
      }
      this.filteredPosts = this.posts.filter(({ tags }) => {
        for (let i = 0; i < tags.length; i++) {
          if (visibleTags.includes(tags[i])) {
            return true;
          }
        }
        return false;
      });
    },
    sort(sortingStrategy) {
      let isInvalidSort = false;
      switch (sortingStrategy.key) {
        case 'descending-date':
          this.posts.sort((a, b) => b.id - a.id);
          break;
        case 'ascending-date':
          this.posts.sort((a, b) => a.id - b.id);
          break;
        case 'ascending-alphabet':
          this.posts.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          isInvalidSort = true;
          break;
      };

      if (isInvalidSort) return;
      this.selectedSortingStrategy = sortingStrategy.key;

      this.computeFilteredPosts(this.visibleTags);
    },
  }
};
</script>
