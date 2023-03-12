<template>
  <div id="back-to-top-button" :class="`sticky bottom-4 m-4 -mt-14 ml-auto bg-primary-light dark:bg-primary-dark w-10 cursor-pointer opacity-75 hover:opacity-100 rounded-full ${dynamicStyles} transition`" @click="scrollToTop">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-10 w-10 p-2" fill="none" viewBox="0 0 24 24" stroke="#ffffff" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'back-to-top',
  data: () => ({
    isVisible: false,
    visibleCutoff: 1200,
    dynamicStyles: 'scale-0'
  }),
  watch: {
    isVisible() {
      if (this.isVisible) {
        this.dynamicStyles = 'motion-safe:animate-zoom-in-fast';
      }
      else {
        this.dynamicStyles = 'motion-safe:animate-zoom-out-fast scale-0';
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    scrollToTop() {
      window.scrollTo(window.scrollX, 0);
    },
    handleScroll() {
      const totalHeight = document.height || document.body.offsetHeight;
      if (!totalHeight) return;

      this.isVisible = this.visibleCutoff < window.scrollY;
    }
  }
};
</script>
