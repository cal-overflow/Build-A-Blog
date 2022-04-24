<template>
  <div class="bg-footer text-white">
    <nav id="footer-bar" class="w-full max-w-screen-lg mx-auto px-8 py-6 px-5 flex items-center justify-between flex-wrap motion-safe:animate-fade-in-slow">
      <div>
        <nav-item
          v-for="item in items"
          :key="item.title"
          :title="item.title"
          :href="item.href"
        />
      </div>

      <div>
        <a id="youtube-link" href="https://www.youtube.com/channel/UCTfscxyX4CI9SnWdFqK4FJw" target="_blank" title="View my Youtube channel">
          <img id="youtube-logo" class="aspect-square w-8 h-auto inline align-middle mx-4" src="/youtube.png" />
        </a>

        <a id="github-link" href="https://github.com/ChristianLisle" target="_blank" title="View my Github account">
          <img id="github-logo" class="invert aspect-square w-6 h-auto inline align-middle mx-4" src="/github.png" />
        </a>
      </div>

    </nav>
  </div>
</template>

<script>
import NavItem from './NavItem.vue';

export default {
  name: 'footer-bar',
  components: {
    NavItem
  },
  props: {
    currentPage: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    items: [
      {
        title: 'Blog',
        href: '/blog'
      },
      {
        title: 'Portfolio',
        href: '/category/portfolio'
      },
      {
        title: 'Contact',
        href: '/contact'
      }
    ]
  }),
};
</script>