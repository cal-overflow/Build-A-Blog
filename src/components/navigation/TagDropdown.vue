<template>
  <div class="inline relative" @mouseenter="isHovering = true" @mouseleave="isHovering = false">
    <nav-item
      class="p-3 align-middle transition dark:text-white whitespace-nowrap"
      href="/tags"
      :active="currentPage === 'Tags'"
    >
      Tags
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :class="`hidden sm:inline h-5 w-5 ${isHovering ? 'motion-safe:-rotate-180' : ''} transition duration-[400]`"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </nav-item>
    <tag-list v-show="isHovering" :current-page="currentPage" classes="absolute top-4 right-0 lg:-right-4 z-10 bg-menu-light dark:bg-menu-dark hover:shadow-lg hover:rounded-none max-h-[33vh] overflow-y-scroll" />
  </div>
</template>

<script>
import TagList from './TagList.vue';
import NavItem from '@/components/navigation/NavItem.vue';

export default {
  name: 'tag-dropdown',
  components: { TagList, NavItem },
  props: {
    currentPage: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    isHovering: false
  })
};
</script>
