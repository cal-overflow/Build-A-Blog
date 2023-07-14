<template>
  <div class="max-w-screen-lg mx-auto">
    <card id="github-repository-heading-card">

      <div class="w-full">
        <div class="w-full flex sm:justify-between">
          <p class="grow font-bold text-2xl">GitHub</p>
            <button class="dark:text-white rounded-lg" @click="isShowingFilter = !isShowingFilter">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>
            </button>
          </div>

          <div v-if="isShowingFilter">
            <divider class="mt-8" />
            <div class="flex justify-between">
              <p class="font-bold text-lg">Language</p>
              <div v-if="languages.length">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="inline w-8 h-8 cursor-pointer pr-2"
                    @click="enableAllLanguages"
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
                    @click="disableAllLanguages"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </div>
            </div>
            <div v-if="languages.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <button
                v-for="language in languages"
                :key="language"
                :class="`m-4 rounded-lg flex items-center ${visibleLanguages.includes(language) ? '' : 'text-extra-gray-light dark:text-extra-gray-dark'} transition duration-250`"
                @click="toggleLanguage(language)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="inline w-6 h-6 pr-2"
                >
                  <path v-if="!visibleLanguages.includes(language)" stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                {{language || "Other"}} ({{repositories.filter((repo) => repo.language === language).length}})
              </button>
            </div>
            <div v-else>
              HELLOO
              <p class="text-extra-gray-dark dark:text-extra-gray-light">No languages to filter</p>
              {{languages}}
            </div>

          <divider />

          <div>
            <p class="font-bold text-lg">Sort by</p>
            <div class="grid grid-cols-1 md:grid-cols-4">
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

      <p v-if="!isShowingFilter">{{description}}</p>
      </div>
    </card>

    <div v-if="filteredRepositories.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6 m-6 max-w-screen-lg flex-wrap md:flex-nowrap">
      <repository-card v-for="repository in filteredRepositories" :key="`repository-${repository.id}`" :repository="repository" />
    </div>

    <card v-else-if="isUnableToLoad" class="col-span-2">
      <div class="w-full">
        <p class="text-center md:text-left text-lg font-bold mt-2">Unable to load repositories 🫤</p>
        <p class="text-center md:text-left">An error occurred retrieving data from GitHub.</p>
        <p class="text-center md:text-left text-sm">Don't worry. You can still view these repositories <a :href="`https://github.com/${user}?tab=repositories`" class="underline hover:no-underline" target="_blank">here</a>.</p>
      </div>
    </card>
    <div v-else grid class="md:grid-cols-2">
      <card v-if="repositories.length !== 0" class="col-span-2">
        <div class="w-full">
          <p class="text-center md:text-left text-xl font-bold mt-2">No repositories 🚫</p>
          <p class="text-center md:text-left">No repositories match the given filter.</p>
        </div>
      </card>

      <card v-else class="col-span-2">
        <div class="w-full">
          <p class="text-center md:text-left text-xl font-bold mt-2">No repositories 😴</p>
          <p class="text-center md:text-left">I don't have any public repositories to show off yet.</p>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/cards/Card.vue';
import RepositoryCard from '@/components/cards/RepositoryCard.vue';

export default {
  name: 'github',
  components: {
    Card,
    RepositoryCard,
  },
  props: {
    user: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
  },
  data: () => ({
    isUnableToLoad: false,
    repositories: [],
    filteredRepositories: [],
    languages: [],
    visibleLanguages: [],
    isShowingFilter: false,
    sortingStrategies: [
      {
        title: 'Popularity',
        key: 'descending-popularity',
      },
      {
        title: 'Last created',
        key: 'descending-created',
      },
      {
        title: 'Last updated',
        key: 'descending-updated',
      },
      {
        title: 'A-Z',
        key: 'ascending-alphabet',
      },
    ],
    selectedSortingStrategy: 'descending-popularity',
  }),
  fetch() {
    fetch(`https://api.github.com/users/${this.user}/repos`)
    .then(async (res) => {
      if (!res.ok) {
        this.isUnableToLoad = true;
        return;
      }

      const repos = await res.json();
      this.repositories = repos.filter(({ name }) => !name.startsWith('.')); // filter out repos starting with `.`
      this.filteredRepositories = [...this.repositories];
      this.languages = [... new Set(this.repositories.map(({ language }) => language))];
      this.visibleLanguages = [...this.languages];
      this.sort({ key: this.selectedSortingStrategy });
    });
  },
  watch: {
    visibleLanguages(updatedVisibleLanguages) {
      this.computeFilteredRepos(updatedVisibleLanguages);
    },
  },
  methods: {
    toggleLanguage(language) {
      const index = this.visibleLanguages.indexOf(language);
      if (index > -1) {
        this.visibleLanguages.splice(index, 1);
      }
      else this.visibleLanguages.push(language);
    },
    enableAllLanguages() {
      this.visibleLanguages = [...this.languages];
    },
    disableAllLanguages() {
      this.visibleLanguages = [];
    },
    computeFilteredRepos(visibleLanguages) {
      this.filteredRepositories = this.repositories.filter(({ language }) => visibleLanguages.includes(language));
    },
    sort(sortingStrategy) {
      let isInvalidSort = false;
      switch (sortingStrategy.key) {
        case 'descending-created':
          this.repositories.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          break;
        case 'descending-updated':
          this.repositories.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
          break;
        case 'descending-popularity':
          this.repositories.sort((a, b) => b.stargazers_count - a.stargazers_count);
          break;
        case 'ascending-alphabet':
          this.repositories.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          isInvalidSort = true;
          break;
      };

      if (isInvalidSort) return;
      this.selectedSortingStrategy = sortingStrategy.key;

      this.computeFilteredRepos(this.visibleLanguages);
    },

  },
};
</script>
