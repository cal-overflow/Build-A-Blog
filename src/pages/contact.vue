<template>
  <main>
    <nav-bar :content="navigation.navbar" :current-page="currentPage" />
    <div  class="max-w-screen-lg mx-auto">
      <card id="contact-header-card">
        <div class="w-full">
          <p class="text-center md:text-left text-3xl font-bold">Contact Me</p>
          <p class="text-center md:text-left text-md">Get in touch with me</p>
        </div>
      </card>

        <divider />

      <contact-form />
    </div>

    <footer-bar :content="navigation.footer" :current-page="currentPage" />
  </main>
</template>

<script>
export default {
  name: 'contact',
  async asyncData({ $content, params, error }) {
    const navigationContent = await $content().where({ path: '/navigation', extension: '.yml' })
      .fetch()
      .catch((err) => {
        error({
          statusCode: 500,
          message: 'Something went wrong',
          error: err,
        });
      });

    if (navigationContent.length !== 1) {
      return error({ statusCode: 500, message: 'The navigation has not been configured.' });
    }

    const navigation = navigationContent[0];

    if (!navigation || !navigation.footer || !navigation.navbar) {
      return error({ statusCode: 500, message: 'The navigation has not been configured.' });
    }

    return {
      navigation,
      currentPage: 'Contact'
    };
  },
};
</script>
