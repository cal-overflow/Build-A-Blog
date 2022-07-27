<template>
  <div class="inline relative" @mouseenter="isHovering = true" @mouseleave="isHovering = false">
    <nav-item
      class="p-3 align-middle transition dark:text-white whitespace-nowrap"
      href="/categories"
      :active="currentPage === 'Categories'"
    >
      Categories
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :class="`inline h-5 w-5 ${isHovering ? 'motion-safe:-rotate-180' : ''} transition duration-[400]`"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </nav-item>
    <category-list v-show="isHovering" :current-page="currentPage" classes="absolute top-2 right-0 left-0 z-10 bg-menu-light dark:bg-menu-dark hover:shadow-lg hover:rounded-none" />
  </div>
</template>

<script>
import CategoryList from './CategoryList.vue';
import NavItem from '@/components/NavItem.vue';

export default {
  name: 'category-dropdown',
  components: { CategoryList, NavItem },
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
