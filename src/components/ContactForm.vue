<template>
  <div id="contact-form-card" class="bg-card-light dark:bg-card-dark m-6 p-6 shadow-md hover:shadow-none hover:rounded motion-safe:animate-fade-in transition">
    <div v-if="formSubmitted" class="flex min-h-80 motion-safe:animate-fade-in">
      <div class="m-auto">
        <p class="mb-4">
          Thanks for reaching out!
          <br />
          <br />
          Be sure to send the email that was just generated for you.
          <br />
          I'll get back to you as soon as I can.
        </p>

        <p class="motion-safe:animate-fade-in-slow">Click <a :href="mailLink" target="_blank" class="text-primary-light dark:text-primary-dark underline hover:no-underline transition">here</a> to open the email link again.</p>
      </div>
    </div>

    <form v-else  @submit.prevent="openMail">
      <div class="flex flex-wrap md:flex-nowrap">
        <div :class="`w-full ${isError ? 'md:w-1/2' : 'md:w-2/3'} p-6 mx-auto`">
          <label for="name">Name</label>
          <br />
          <input
            v-model="name"
            name="name"
            required
            :class="textInputStyle()"
          />

          <br />

          <label for="topic">Topic</label>
          <br />
          <input
            v-model="topic"
            name="topic"
            required
            :placeholder="topicPlaceholder"
            :class="textInputStyle()"
          />

          <label for="message">{{messageLabel}}</label>
          <br />
          <textarea
            v-model="message"
            name="message"
            required
            :placeholder="messagePlaceholder"
            :class="textInputStyle({ classes: 'h-32' })"
          />
        </div>

        <div v-if="hasExtraInformation" class="w-full md:w-1/2 mx-auto p-6 mx-auto">
          <p class="text-lg font-bold">{{extraInfoLabel}}</p>
          <p class="text-sm text-extra-gray-dark dark:text-extra-gray-light transition">{{extraInfoDescription}}</p>
          <div v-if="$route.query.statusCode">
            <label for="statusCode">Status Code</label>
            <br />
            <input
              name="statusCode"
              :value="$route.query.statusCode"
              disabled
              :class="textInputStyle({disabled: true})"
            />
          </div>

          <div v-if="$route.query.path">
            <label for="path">Path</label>
            <br />
            <input
              name="path"
              :value="$route.query.path"
              disabled
              :class="textInputStyle({disabled: true})"
            />
          </div>

          <div v-if="$route.query.detail">
            <label for="errorDetails">Error detail</label>
            <br />
            <textarea
              name="errorDetails"
              :value="$route.query.detail"
              disabled
              :class="textInputStyle({classes: 'h-32', disabled: true})"
            />
          </div>
        </div>
      </div>

      <div :class="`${!isError ? 'md:w-2/3' : ''} mx-auto p-6`">
        <input
          type="submit"
          value="Continue"
          :class="`rounded-md py-1 px-2 bg-primary-light dark:bg-primary-dark text-white transition duration-1000 ${name || topic || message ? 'opacity-1' : 'opacity-25'}`"
        />
        <p :class="`text-sm text-extra-gray-dark dark:text-extra-gray-light transition duration-1000 ${name || topic || message ? 'opacity-1' : 'opacity-0'}`">
          An email will be generated for you based on the information you provided above. All you have to do is press send.
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'contact-form',
  data: () => ({
    emailAddress: process.env.NUXT_ENV_EMAIL_ADDRESS,
    name: undefined,
    topic: undefined,
    message: undefined,
    formSubmitted: false,
    isError: false,
    topicPlaceholder: '',
    messageLabel: '',
    messagePlaceholder: '',
    hasExtraInformation: false,
    extraInfoLabel: false,
    extraInfoDescription: false,
  }),
  computed: {
    mailLink() {
      let body;

      if (this.isError) {
        const statusCode = `Status Code: ${this.$route?.query.statusCode || '---' }`;
        const path = `Path: ${this.$route?.query.path || '---' }`;
        const detail = `Detail: ${this.$route?.query.detail || '---' }`;

        body = `Error information:\n${statusCode}\n${path}\n${detail}\n\nFeedback:\n${this.message || 'Not provided'}\n\nFeedback provided by: ${this.name || 'anonymous'}`;
      }
      else {
        body = `${this.message || 'No message provided'}\n\nFrom: ${this.name || 'anonymous'}`;
      }
      
      return `mailto:${this.emailAddress}?subject=${encodeURIComponent(this.topic || 'Website Contact Form')}&body=${encodeURIComponent(body)}`;
    },
  },
  mounted() {
    if (Object.keys(this.$route?.query).length) {
      if (this.$route?.query.statusCode) {
        this.isError = this.hasExtraInformation = true;
        this.topicPlaceholder = `${this.$route.query.statusCode} error`;
        this.messageLabel = 'Describe what happened when this error occurred';
        this.messagePlaceholder = 'I saw an error when I tried viewing the blog post about your multiplayer pac-man game, CyRun.';
        this.extraInfoLabel = 'Error information 🤓';
        this.extraInfoDescription = 'This information was generated by the error you received.';

        return true;
      }

      if (this.$route?.query.topic) {
        this.topic = this.$route.query.topic;
      }
    }

    this.topicPlaceholder = '';
    this.messageLabel = 'Message';
    this.messagePlaceholder = 'Your website is awesome! 🤩';

    return false;
  },
  methods: {
    openMail() {
      window.open(this.mailLink, '_blank');

      this.formSubmitted = true;
    },
    textInputStyle(options) {
      const classes = 'w-full resize-none px-4 py-2 bg-extra-gray-light dark:bg-extra-gray-dark rounded-lg outline-none focus:rounded-sm focus:ring focus:ring-primary-light focus:dark:ring-primary-dark transition';

      return `${classes} ${options?.classes || ''} ${options?.disabled ? 'disabled' : ''}`;
    },
  }
};
</script>
