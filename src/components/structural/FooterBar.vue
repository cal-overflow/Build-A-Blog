<template>
  <div class="bg-footer text-white">
    <nav id="footer-bar" class="w-full max-w-screen-lg mx-auto px-8 py-6 flex flex-wrap items-center justify-center sm:justify-between gap-y-4 motion-safe:animate-fade-in-slow">
      <div>
        <nav-item
          v-for="item in content.navItems"
          :key="item.title"
          :href="item.href"
        >
          {{ item.title }}
        </nav-item>
      </div>

      <div class="justify-center flex items-center">
        <a v-if="content.imageNavItems && content.imageNavItems.youtubeUrl" id="youtube-link" :href="content.imageNavItems.youtubeUrl" target="_blank" title="View my Youtube channel">
          <img id="youtube-logo" class="aspect-square w-8 h-auto inline align-middle mx-4" src="~/assets/images/youtube.png" />
        </a>

        <a v-if="content.imageNavItems && content.imageNavItems.githubUrl" id="github-link" :href="content.imageNavItems.githubUrl" target="_blank" title="View my Github account">
          <img id="github-logo" class="invert aspect-square w-6 h-auto inline align-middle mx-4" src="~/assets/images/github.png" />
        </a>
      </div>

    </nav>
  </div>
</template>

<script>
import NavItem from '../navigation//NavItem.vue';

export default {
  name: 'footer-bar',
  components: {
    NavItem
  },
  props: {
    content: {
      type: Object,
      required: true,
      default: () => ({})
    },
    currentPage: {
      type: String,
      default: ''
    }
  },
};
</script>
