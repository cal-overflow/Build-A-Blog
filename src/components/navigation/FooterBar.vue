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

        <a v-if="content.imageNavItems && content.imageNavItems.twitterUrl" id="twitter-link" :href="content.imageNavItems.twitterUrl" target="_blank" title="View my Twitter account">
          <img id="twitter-logo" class="invert aspect-square w-6 h-auto inline align-middle mx-4" src="~/assets/images/twitter.png" />
        </a>

        <a v-if="content.imageNavItems && content.imageNavItems.facebookUrl" id="facebook-link" :href="content.imageNavItems.facebookUrl" target="_blank" title="View my Facebook account">
          <img id="facebook-logo" class="invert aspect-square w-6 h-auto inline align-middle mx-4" src="~/assets/images/facebook.png" />
        </a>

        <a v-if="content.imageNavItems && content.imageNavItems.linkedinUrl" id="linkedin-link" :href="content.imageNavItems.linkedinUrl" target="_blank" title="View my LinkedIn account">
          <img id="linkedin-logo" class="invert aspect-square w-6 h-auto inline align-middle mx-4" src="~/assets/images/linkedin.png" />
        </a>

        <a v-if="content.imageNavItems && content.imageNavItems.instagramUrl" id="instagram-link" :href="content.imageNavItems.instagramUrl" target="_blank" title="View my Instagram account">
          <img id="instagram-logo" class="invert aspect-square w-6 h-auto inline align-middle mx-4" src="~/assets/images/instagram.png" />
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
