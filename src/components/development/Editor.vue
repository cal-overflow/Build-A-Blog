<!-- Beware - This component is untested and intended to be used in development environments only -->
<!-- Much of this is based upon the default Nuxt/Content editor (https://github.com/nuxt/content/blob/v1/packages/content/templates/editor.vue) -->
<template>
  <form @submit.prevent="endEdit();">
    <div v-if="post">
      <p class="text-md md:text-xl lg:text-2xl text-center text-extra-gray-dark dark:text-extra-gray-light my-2 !leading-tight">Editing post {{ post.data.id }}</p>
      <input
        type="submit"
        value="Save"
        class="rounded-md py-1 px-2 align-right bg-primary-light dark:bg-primary-dark text-white text-3xl transition duration-1000 cursor-pointer sm:absolute top-2 right-2"
      />

      <label for="title">Title</label>
      <textarea
        ref="startingInput"
        v-model="post.data.title"
        name="title"
        :class="textInputStyle({ classes: 'text-4xl md:text-5xl lg:text-6xl font-bold mb-2 !leading-tight w-full bg-card-light dark:bg-card-dark resize-none overflow-hidden' })"
        placeholder="Post Title"
        required
      />
      <div class="border-2 border-extra-gray-light dark:border-extra-gray-dark p-2 rounded-sm mb-2">
        <label class="m-2">Metadata</label>
        <div class="flex flex-wrap lg:flex-nowrap">
          <div class="w-full lg:w-1/2 m-2">
            <label for="date">Post Date</label>
            <br />
            <input
              v-model="post.data.date"
              name="date"
              placeholder="Wed Apr 27, 2022"
              :class="textInputStyle({ classes: 'bg-extra-gray-light dark:bg-extra-gray-dark' })"
              required
            />
          </div>

          <div class="w-full lg:w-1/2 m-2">
            <label for="slug">Slug</label>
            <br />
            <input
              v-model="post.data.slug"
              name="slug"
              placeholder="awesome-post"
              :class="textInputStyle({ classes: 'bg-extra-gray-light dark:bg-extra-gray-dark' })"
              required
            />
          </div>
        </div>

        <div class="flex flex-wrap lg:flex-nowrap">
          <div class="w-full lg:w-1/2 m-2">
            <label for="categories">Categories</label>
            <br />
            <small class="text-xs text-extra-gray-dark dark:text-extra-gray-light">Must match Category title</small>
            <br />
            <input
              v-for="(_, i) in post.data.categories.length"
              :id="`category-${i}`"
              :key="`category-${i}`"
              v-model="post.data.categories[i]"
              name="categories"
              :class="textInputStyle({ classes: 'bg-extra-gray-light dark:bg-extra-gray-dark my-1' })"
            />
            <input
              :disabled="post.data.categories.includes('')"
              type="button"
              value="Add Category"
              :class="`rounded-md py-1 px-2 align-right bg-primary-light dark:bg-primary-dark text-white  transition duration-500 ${post.data.categories.includes('') ? 'opacity-25' : 'cursor-pointer'}`"
              @click="post.data.categories.push('')"
            />
          </div>

          <div class="w-full lg:w-1/2 m-2">
            <label for="img">Feature Image</label>
            <br />
            <small class="text-xs text-extra-gray-dark dark:text-extra-gray-light">Image located at: <code>src/assets/images/feature/</code></small>
            <br />
            <input
              v-model="post.data.img"
              name="img"
              :class="textInputStyle({ classes: 'bg-extra-gray-light dark:bg-extra-gray-dark' })"
              placeholder="feature-image.jpg"
              required
            />
          </div>
        </div>
      </div>

      <label for="body">Body</label>
      <textarea
        v-model="post.body"
        name="body"
        :class="textInputStyle({ classes: 'h-screen bg-extra-gray-light dark:bg-extra-gray-dark' })"
        @keydown.tab.exact.prevent="onTabRight"
        @keydown.tab.shift.prevent="onTabLeft"
        @compositionstart.prevent="isInComposition = true"
        @compositionend.prevent="isInComposition = false"
      />
    </div>

    <div v-else>
      <textarea
        ref="startingInput"
        v-model="file"
        name="file"
        :class="textInputStyle({ classes: 'h-80 bg-extra-gray-light dark:bg-extra-gray-dark' })"
        @keydown.tab.exact.prevent="onTabRight"
        @keydown.tab.shift.prevent="onTabLeft"
        @compositionstart.prevent="isInComposition = true"
        @compositionend.prevent="isInComposition = false"
        @blur="endEdit();"
      />
      <small class="text-extra-gray-dark dark:text-extra-gray-light">Click outside the textarea to stop editing<br /><strong>Changes are saved automatically</strong></small>
    </div>
  </form>
</template>

<script>
import matter from 'gray-matter';

export default {
  name: 'editor',
  props: {
    isEditing: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
  },
  data: () => ({
    file: '',
    originalFileObj: undefined,
    post: undefined,
    isInComposition: false,
  }),
  watch: {
    value() {
      this.isEditingEnabled = !(this.$parent.$attrs.editable === false);

      if (this.isEditingEnabled) {
        this.file = this.value;
        this.originalFileObj = matter(this.file);
        const isPost = this.$nuxt.$route.path === `/post/${this.originalFileObj.data.slug}`;
  
        if (isPost) {
          this.post = {
            data: {
              id: this.originalFileObj.data.id,
              title: this.originalFileObj.data.title,
              slug: this.originalFileObj.data.slug,
              date: this.originalFileObj.data.date,
              img: this.originalFileObj.data.img,
              categories: this.originalFileObj.data.categories
            },
            body: this.originalFileObj.content
          };
  
          if (this.post.data.categories.length === 0) this.categories.push('');  
        }
      }
      else {
        // The nuxt-content that triggered this edit has an attribute called editable set to false. Reload the page
        alert('This content cannot be edited in live mode.\nThe page will be refreshed');
        location.reload();
      }
    },
    isEditing() {
      if (this.isEditingEnabled) {
        this.$refs.startingInput.focus();
        this.$parent.$emit('startEdit');
      }
    },
    file() {
      this.onType();
    }
  },
  methods: {
    onType () {
      const el = this.$refs.titleTextarea;
      if (el) {
        el.style.height = 'auto';
  
        this.$nextTick(() => {
          if (el.scrollHeight !== 0)
            el.style.height = `${el.scrollHeight}px`;
        });
      }
    },
    onTabRight(event) {
      if (this.isInComposition) return;

      if (this.post) {
        const text = this.post.body;
        const originalSelectionStart = event.target.selectionStart;
        const textStart = text.slice(0, originalSelectionStart);
        const textEnd = text.slice(originalSelectionStart);
        this.post.body = `${textStart}\t${textEnd}`;
        event.target.value = this.post.body; // required to make the cursor stay in place.
        event.target.selectionEnd = event.target.selectionStart = originalSelectionStart + 1;
      }
      else {
        const text = this.file;
        const originalSelectionStart = event.target.selectionStart;
        const textStart = text.slice(0, originalSelectionStart);
        const textEnd = text.slice(originalSelectionStart);
        this.file = `${textStart}\t${textEnd}`;
        event.target.value = this.file; // required to make the cursor stay in place.
        event.target.selectionEnd = event.target.selectionStart = originalSelectionStart + 1;
      }
    },
    onTabLeft(event) {
      if (this.isInComposition) return;

      if (this.post) {
        const text = this.post.body;
        const originalSelectionStart = event.target.selectionStart;
        const textStart = text.slice(0, originalSelectionStart);
        const textEnd = text.slice(originalSelectionStart);
        this.post.body = `${textStart.replace(/\t$/, '')}${textEnd}`;
        event.target.value = this.post.body; // required to make the cursor stay in place.
        event.target.selectionEnd = event.target.selectionStart = originalSelectionStart - 1;
      }
      else {
        const text = this.file;
        const originalSelectionStart = event.target.selectionStart;
        const textStart = text.slice(0, originalSelectionStart);
        const textEnd = text.slice(originalSelectionStart);
        this.file = `${textStart.replace(/\t$/, '')}${textEnd}`;
        event.target.value = this.file; // required to make the cursor stay in place.
        event.target.selectionEnd = event.target.selectionStart = originalSelectionStart - 1;
      }
    },
    textInputStyle(options) {
      const classes = 'w-full resize-none px-4 py-2 rounded-lg outline-none focus:rounded-sm focus:ring focus:ring-primary-light focus:dark:ring-primary-dark transition';

      return `${classes} ${options?.classes || ''} ${options?.disabled ? 'disabled' : ''}`;
    },
    endEdit() {
      if (this.post) {
        this.post.data.categories = this.post.data.categories.filter((category) => category !== '');
        this.file = matter.stringify(this.post.body, { ...this.post.data });
      }

      this.$emit('input', this.file);
      this.$emit('endEdit');
      this.$parent.$emit('endEdit');

      if (this.post && this.post.data.slug !== this.originalFileObj.data.slug) {
        const path = `/post/${this.slug}`;

        this.$nuxt.error({
          statusCode: 303,
          message: `Moved to ${path}`,
          error: new Error(`Post "${this.post.data.title}" is no longer accessible at ${this.$nuxt.$route.path}`)
        });

      }
    }
  }
};
</script>
