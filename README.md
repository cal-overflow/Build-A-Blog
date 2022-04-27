# Portfolio [![Netlify Status](https://api.netlify.com/api/v1/badges/15085e05-f139-4f5f-a673-6bf86682c401/deploy-status)](https://app.netlify.com/sites/christianlisle/deploys)

Personal website used for blogging and showcasing work.

Built primarily with [NuxtJS](https://nuxtjs.org/) and [TailwindCSS](https://tailwindcss.com/).

<!-- Table of contents -->
### Table of contents
- [Running locally](#running-locally) 
  - [Environment setup](#environment-setup)
  - [Environment variables](#environment-variables)
  - [Run or generate the website](#run-or-generate-the-website)
  - [Testing](#testing-)
- [Make the site your own](#make-the-site-your-own-)
  1. [Set environment variables](#1-set-environment-variables)
  2. [Change the site description](#2-change-the-site-description)
  3. [Remove old content](#3-remove-old-content)
  4. [Replace essential content](#4-replace-essential-content)
  5. [Change the color palette](#5-change-the-color-palette)
  6. [Write your first blog post](#6-write-your-first-blog-post)
- [Blog posts](#blog-posts-)
- [Post categories](#post-categories)

## Running locally
### Environment setup
First, navigate to the project directory and ensure you're using the correct version of Node. Then, install the Node dependencies with [npm](https://www.npmjs.com/).
```bash
$ cd portfolio

# ensure node version is correct
$ nvm use

# install dependencies
$ npm install
```

### Environment variables
Copy the contents below into a file called `.env`  and fill in the values as needed.

```text[.env]
NUXT_ENV_SITE_URL=
NUXT_ENV_FULL_NAME=
NUXT_ENV_EMAIL_ADDRESS=
NUXT_ENV_SITE_NAME=
NUXT_ENV_GITHUB_PROFILE_URL=
NUXT_ENV_YOUTUBE_CHANNEL_URL=
```
<details>
  <summary>The purpose of each environment variable</summary>


  | Variable | Description | Required |
  | ----: | ------ | :--: |
  | `SITE_URL` | Utilized by the RSS feed generator to let readers know where they can find your site. | ✅ |
  | `FULL_NAME` | Utilized throughout the site in places like the introduction "Hi. I'm ___." and the NavBar's home page title.  | ✅ |
  | `EMAIL_ADDRESS` | Utilized for contact requests. | ✅ |
  | `SITE_NAME` | Utilized by the site to change the site title. If left blank, the `FULL_NAME` value is used. |  |
  | `GITHUB_PROFILE_URL` | When present, a link to GitHub is shown in the FooterBar. |  |
  | `YOUTUBE_CHANNEL_URL` | When present, a link to Youtube is shown in the FooterBar. |  |

  Note that each environment variable name is preceded by `NUXT_ENV_` so that it is easily accessible by the nuxt application. Refer to Nuxt's [Environment Variables documentation](https://nuxtjs.org/docs/configuration-glossary/configuration-env/#automatic-injection-of-environment-variables).
</details>

### Run or generate the website
Once you've installed the necessary Node modules and configured your environment variables, you can run the application. Run the application using the command that is most appropriate for your environment.

```bash
# serve with hot reload at localhost:3000 - ideal for development
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```


### Testing 🧪

Unit tests can be run with the [Jest](https://jestjs.io/) test runner. End-to-end tests are run with [Cypress](https://www.cypress.io/).

```bash
# run unit tests
$ npm run unit

# run e2e tests
$ npm run e2e

# run e2e in headless mode
$ npm run e2e:headless

# run e2e by connecting to an already-running server
$ npm run e2e:live
``` 


## Make the site your own 👨‍💻
I've built this portfolio to be "modular" so that most of the content is seperate from the components themselves. If you'd like a website similar to this, you can do so without needing to build it from scratch. Simply clone the repository and follow the steps below.

### 1. Set environment variables

Refer the [Environment variables](#environment-variables) section above.

### 2. Change the site description

Find the `head` object within the `nuxt.config.js` file. Change the value of `content` in the object named `description`.

```diff
head: {
  meta: [
    // ...
    {
      hid: 'description',
      name: 'description',
-     content: "Software engineer passionate about personal projects, open source, and all things software."
+     content: "YOUR SITE DESCRIPTION HERE"
    },
  ],
}
```
The current description is the one that I wrote for my website.


### 3. Remove old content
Remove all of my blog posts, post categories, and the files that are related to those blog posts. This requires the following:

- [ ] Delete all of the blog posts found within the `src/content/posts/` directory.
- [ ] Delete all files except `portfolio.md` within the `src/content/categories/` directory.
- [ ] Delete all contents within the `src/static/blog-images/` directory and any subdirectories.
- [ ] Create a new `feature/` directory within the `src/static/blog-images/` directory.

<details>
  <summary>
    <strong>Optional:</strong> Delete extra <code>ContactForm</code> functionality (advanced)
  </summary>

  The `ContactForm` component is configured to understand special query params that are specific to feedback for projects like my [Snapchat memory downloader](https://github.com/ChristianLisle/memory-download). You can leave this functionality, and it will not cause any problems. However, I have created the following instructions in case you'd like to remove the functionality.

  Make the following changes to the two files below. Click the file name to expand the file diff.
  
  <details markdown="1">
    <summary><code>src/components/ContactForm.vue</code></summary>

>    ```diff
>    <template>
>      <div id="contact-form-card" class="bg-card-light dark:bg-card-dark m-6 p-6 shadow-md hover:shadow-none hover:rounded motion-safe:animate-fade-in transition">
>
>        // ...
>
>        <form v-else  @submit.prevent="openMail">
>          <div class="flex flex-wrap md:flex-nowrap">
>
>            // ...
>
>            <div v-if="hasExtraInformation" class="w-full md:w-1/2 mx-auto p-6 mx-auto">
>
>              // ...
>
>              <div v-if="$route.query.detail">
>                <label for="errorDetails">Error detail</label>
>                <br />
>                <textarea
>                  name="errorDetails"
>                  :value="$route.query.detail"
>                  disabled
>                  :class="textInputStyle({classes: 'h-32', disabled: true})"
>                />
>              </div>
>
>    -         <div v-if="$route.query.photos">
>    -           <label for="photoCount">Photos</label>
>    -           <br />
>    -           <input
>    -             name="photoCount"
>    -             :value="$route.query.photos"
>    -             disabled
>    -             :class="textInputStyle({disabled: true})"
>    -           />
>    -         </div>
>    - 
>    -         <div v-if="$route.query.videos">
>    -           <label for="videoCount">Videos</label>
>    -           <br />
>    -           <input
>    -             name="videoCount"
>    -             :value="$route.query.videos"
>    -             disabled
>    -             :class="textInputStyle({disabled: true})"
>    -           />
>    -         </div>
>
>              <div v-if="$route.query.version">
>                <label for="appVersion">Version</label>
>                <br />
>                <input
>                  name="appVersion"
>                  :value="$route.query.version"
>                  disabled
>                  :class="textInputStyle({disabled: true})"
>                />
>              </div>
>            </div>
>          </div>
>
>          // ...
>
>        </form>
>      </div>
>    </template>
>
>    <script>
>    export default {
>      name: 'contact-form',
>
>      // ...
>      
>      computed: {
>        mailLink() {
>          let body;
>
>          if (this.isError) {
>            // ...
>          }
>          else if (this.isAppFeedback) {
>    -       const photos = this.$route?.query.photos ? `Photos: ${this.$route?.query.photos}` : undefined;
>    -       const videos = this.$route?.query.videos ? `Videos: ${this.$route?.query.videos}` : undefined;
>            const appVersion = this.$route?.query.version ? `App Version: ${this.$route?.query.version}` : undefined;
>    -       const appUseInfo = (photos || videos || appVersion) ? `Information from app:\n${photos}\n${videos}\n${appVersion}\n\n` : '';
>    +       const appUseInfo = appVersion ? `Information from app:\n${appVersion}\n\n` : '';
>
>            body =  `${appUseInfo}Feedback:\n${this.message || 'No message provided'}\n\nFrom:\n${this.name || 'anonymous'}`;
>          }
>          else {
>            body = `${this.message || 'No message provided'}\n\nFrom: ${this.name || 'anonymous'}`;
>          }
>          
>          return `mailto:${this.emailAddress}?subject=${encodeURIComponent(this.topic || 'Website Contact Form')}&body=${encodeURIComponent(body)}`;
>        },
>      },
>      mounted() {
>        if (Object.keys(this.$route?.query).length) {
>          if (this.$route?.query.statusCode) {
>            this.isError = this.hasExtraInformation = true;
>            this.topicPlaceholder = `${this.$route.query.statusCode} error`;
>            this.messageLabel = 'Describe what happened when this error occurred';
>            this.messagePlaceholder = 'I saw an error when I tried viewing the blog post about your multiplayer pac-man game, CyRun.';
>            this.extraInfoLabel = 'Error information 🤓';
>            this.extraInfoDescription = 'This information was generated by the error you received.';
>
>            return true;
>          }
>
>    -     if (this.$route?.query.memoryDownload) {
>    -       this.isAppFeedback = true;
>    -       this.topicPlaceholder = 'Memory Downloader feedback';
>    -       this.messageLabel = 'Feedback';
>    -       this.messagePlaceholder = 'I downloaded the app, but my download is stuck at 20%';
>    -       
>    -       this.extraInfoLabel = 'Extra information';
>    -       this.extraInfoDescription = 'This information was generated from the app.';
>    -       this.hasExtraInformation = this.$route.query.photos || this.$route.query.videos || this.$route.query.version;
>    -       
>    -       return true;
>    -     }
>
>          if (this.$route?.query.topic) {
>            this.topic = this.$route.query.topic;
>          }
>        }
>
>        this.topicPlaceholder = '';
>        this.messageLabel = 'Message';
>        this.messagePlaceholder = 'Your website is awesome! 🤩';
>
>        return false;
>      },
>      methods: {
>        // ...
>      }
>    };
>    </script>
>    ```
>
 </details>

  <details markdown="1">
    <summary><code>test/unit/components/ContactForm.spec.js</code></summary>

>    ```diff
>      import { mount } from "@vue/test-utils";
>      import Chance from "chance";
>      import ContactForm from '@/components/ContactForm.vue';
>
>      const chance = new Chance();
>
>      describe('ContactForm', () => {
>        // ...
>
>    -   describe('given there are query parameters entailing feedback for the memory-download app', () => {
>    -   
>    -     beforeEach(() => {
>    -       query = {
>    -         memoryDownload: true,
>    -         photos: chance.integer({min: 0}),
>    -         videos: chance.integer({min: 0}),
>    -         version: `${chance.integer({min: 1})}.${chance.integer({min: 1})}.0`
>    -       };
>    -       
>    -       wrapper = mount(ContactForm, {
>    -         mocks: {
>    -           $route: {query} 
>    -         }
>    -       });
>    -     });
>    -     
>    -     it('renders the name label and input', () => {
>    -       expect(wrapper.find('[for="message"]').element.innerHTML).toEqual('Feedback');
>    -       expect(wrapper.find('[name="message"]').element.placeholder).toEqual('I downloaded the app, but my download is stuck at 20%');
>    -     });
>    -     
>    -     it('renders the topic label and placeholder correctly', () => {
>    -       expect(wrapper.find('[for="topic"]').element.innerHTML).toEqual('Topic');
>    -       expect(wrapper.find('[name="topic"]').element.placeholder).toEqual('Memory Downloader feedback');
>    -     });
>    -     
>    -     it('renders the photo and video counts', () => {
>    -       expect(wrapper.find('[name="photoCount"]').element.value).toEqual(`${query.photos}`);
>    -       expect(wrapper.find('[name="videoCount"]').element.value).toEqual(`${query.videos}`);
>    -     });
>    -     
>    -     it('renders the app version', () => {
>    -       expect(wrapper.find('[name="appVersion"]').element.value).toEqual(`${query.version}`);
>    -     });
>    -     
>    -     it('computes the correctly formatted mailto link', async () => {
>    -       const name = chance.string();
>    -       const feedback = chance.paragraph();
>    -       const appUseInfo = `Information from app:\nPhotos: ${query.photos}\nVideos: ${query.videos}\nApp Version: ${query.version}\n\n`;
>    -       const body = `${appUseInfo}Feedback:\n${feedback}\n\nFrom:\n${name}`;
>    -       const expectedLink = `mailto:${process.env.NUXT_ENV_EMAIL_ADDRESS}?subject=${encodeURIComponent('Website Contact Form')}&body=${encodeURIComponent(body)}`;
>    -       
>    -       
>    -       wrapper.find('[name="name"]').setValue(name);
>    -       wrapper.find('[name="message"]').setValue(feedback);
>    -       
>    -       await wrapper.vm.$nextTick();
>    -       expect(wrapper.vm.mailLink).toEqual(expectedLink);
>    -     });
>    -   });
>      });
>    ```

  </details>
    
  **Note:** Writing new unit tests and functionality for app versioning feedback is recommended.

</details>

### 4. Replace essential content
Replace the essentials such as my bio and description of my blog/portfolio with your own. Complete the following:

- [ ] Replace the existing `favicon.ico` and `headshot.png` files within the `src/static/` directory.
- [ ] Replace the contents of `about.md`, `blog-preview.md`, and `portfolio-preview.md` found within the `src/content/` directory.
- [ ] Replace the description for the Portfolio category by editing the `description` attribute of `src/content/categories/portfolio.md`. Refer to the [Post categories](#post-categories) section.


### 5. Change the color palette
Change the color scheme of the website by editing `color` object within the `tailwind.config.js` file in the `src/` directory. You can find a small description for some of the properties below.

```js
colors: {
  'footer': '#292929',        // Background color of footer
  'menu-light': '#E0E0E1',    // Background color of menu bar in light mode
  'menu-dark': '#1F1F1F',     // Background color of menu bar in dark mode
  'card-light': '#EAEAEB',    // Background color of each card in light mode
  'card-dark': '#262626',     // Background color of each card in dark mode
  'primary-light': '#A61E17', // Primary color in light mode (red)
  'primary-dark': '#00B4E6',  // Primary color in dark mode (light blue)
  // ...
}
```

### 6. Write your first blog post

Now that you've done all the heavy lifting, your website should have a basic home page and be ready to serve some blog posts. Reference the [Blog Posts](#blog-posts-) section below for general information on writing a blog post.

Re-visit the [Running locally](#running-locally) section for more details on installing necessary dependencies and launching the application.

---

## Blog posts 📝
Blog posts are written in [markdown](https://www.markdownguide.org/) and convertted to HTML with the [Nuxt Content](https://content.nuxtjs.org/) module.

To write a blog post, create a markdown file within the `src/content/posts/` directory. An [example post](https://www.christianlisle.io/post/download-snapchat-memories) is shown below.

```md
---
id: 12
title: How to download your Snapchat memories
slug: download-snapchat-memories
date: February 20, 2022
img: memories.jpg
categories: ['Portfolio', 'Tutorials']
---

People nowadays take hundreds, and even thousands, of photos and videos regularly. Millions of people save these images and photos on social networking apps like Snapchat.


Platforms such as Snapchat are wonderful for a variety of reasons. However, having photos and videos stored in different places can make it difficult to keep your precious memories organized.

<!--more-->

In this tutorial, you'll find the steps necessary to download all of your Snapchat memories to your computer.

...
```

View the Nuxt docs on [Writing Content](https://content.nuxtjs.org/writing) for a detailed explanation on how to write blog posts.

## Post categories
Post categories allow you to group posts together based on similarities such as topic. Post categories are defined in markdown files, similar to posts themselves.

Categories should be defined within the `src/content/categories/` directory. Each category file should contain a yml section with each of the properties shown in the example below.

```md
---
title: Tutorials
slug: tutorials
description: Thorough guides that I have created to help others.
---
```

Once a category has been created, users can view all posts under that category by visiting the endpoint `/category/slug`, where `slug` is replaced by the value you set.

For example, the category defined in the example above is accesible by visting `/category/tutorials`.