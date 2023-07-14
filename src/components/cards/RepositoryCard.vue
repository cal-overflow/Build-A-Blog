<template>
  <card class="grow page-preview-card flex m-0 col-span-1 flex-col justify-between w-full">
    <div class="flex justify-between">
      <a
        :href="repository.html_url"
        target="_blank"
        class="hover:underline align-middle dark:text-white font-bold"
      >
        {{repository.name}}
      </a>
      <div>
        <span v-if="repository.stargazers_count">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
          {{repository.stargazers_count}}
        </span>
      </div>
    </div>
    <p class="dark:text-extra-gray-light text-extra-gray-dark">
      {{formattedDescription}}
    </p>

    <div class="flex justify-between text-extra-gray-dark dark:text-extra-gray-light font-thin">
      <span class="text-xs my-auto">{{repository.language}}</span>

      <div>
        <div title="Template" class="cursor-help inline">
          <svg v-if="repository.is_template" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
          </svg>
        </div>

        <div title="Archived" class="cursor-help inline">
          <svg v-if="repository.archived" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
        </div>
      </div>
    </div>

  </card>
</template>

<script>
import Card from '@/components/cards/Card.vue';

export default {
  name: 'repository-card',
  components: {
    Card,
  },
  props: {
    repository: {
      type: Object,
      default: undefined
    },
  },
  computed: {
    formattedDescription() {
      if (!this.repository.description) return '';
      const splitDescription = this.repository.description.split('.');
      if (splitDescription.length > 1) {
        return `${splitDescription[0]}...`;
      }
      else return splitDescription[0];
    },
  },
};

</script>
