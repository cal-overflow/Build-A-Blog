  # Build-A-Blog

  A template website for blogging and showcasing work. \
  This document contains the steps necessary to generate your own website using this template.

  <!-- Table of contents -->
  ### Table of contents
  #### Create your own website
    1. [Generate repository](#1-generate-a-repository)
    2. [Set environment variables](#2-set-environment-variables)
    3. [Enter a site description](#3-enter-a-site-description)
    4. [Create essential content](#4-create-essential-content)
    5. [Change the color palette](#5-change-the-color-palette-optional) (optional)
    6. [Write your first blog post](#6-write-your-first-blog-post-optional) (optional)
  #### General
  - [Running locally](#running-locally) 
    - [Environment setup](#environment-setup)
    - [Environment variables](#environment-variables)
    - [Run or generate the website](#run-or-generate-the-website)
    - [Testing](#testing-)
  - [Fetching new features](#updating-your-website-with-new-features-in-the-template) 

  ## 1. Generate a repository
  Through GitHub you can use a template repository such as this to generate your own repository. \
  Use this repository as a template by following [these steps](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template).

  Once your repository has been generated, follow the below steps.

  ## 2. Set environment variables
  Copy the contents below into a file called `.env`  and fill in the values as needed.

  ```text[.env]
  NUXT_ENV_SITE_URL=
  NUXT_ENV_FULL_NAME=
  NUXT_ENV_SITE_NAME=
  ```
  <details>
    <summary>Click here to view the purpose of each environment variable</summary>


    | Variable | Description | Required |
    | ----: | ------ | :--: |
    | `SITE_URL` | Utilized by the RSS feed generator to let readers know where they can find your site. | ✅ |
    | `FULL_NAME` | Utilized throughout the site.  | ✅ |
    | `SITE_NAME` | Utilized by the site to change the site title. If left blank, the `FULL_NAME` value is used. |  |

    Note that each environment variable name is preceded by `NUXT_ENV_` so that it is easily accessible by the nuxt application. Refer to Nuxt's [Environment Variables documentation](https://nuxtjs.org/docs/configuration-glossary/configuration-env/#automatic-injection-of-environment-variables).
  </details>

  ## 3. Enter a site description

  Find the `head` object within the `nuxt.config.js` file. Change the value of `content` in the object named `description`.

  ```diff
head: {
  meta: [
    // ...
    {
      hid: 'description',
      name: 'description',
-     content: "Enter your site description here."
+     content: "YOUR SITE DESCRIPTION"
    },
  ],
}
```

## 4. Create essential content
The `src/content` folder will contain not only the content of the website, but also define the site's structure, and different sections of the site.\
View the `src/content` folder for [cal-overflow.dev](https://cal-overflow.dev) (the creator's website) [here](https://github.com/cal-overflow/site/tree/main/src/content).

Learn more about sections [here](./README.md#sections).

### Required content
The following content **must be properly defined or the website will not function properly**.

#### Home page content
Defined within the `src/content/Home` folder, is the index (home) page of the website. See an example [here](https://github.com/cal-overflow/site/tree/main/src/content/home).

#### Navigation content
The navigation (nav-bar and footer-bar) are dynamically generated. The navigation components will load the content defined within the `src/content/navigation.yml` file. The file should look like this:

```yaml
navbar: # required
  signatureNavItem: # optional
    title: 'cal overflow'
    href: '/'
  navItems:  # required
    - title: 'Blog'
      href: '/blog'
    - title: 'Portfolio'
      href: '/portfolio'
footer: # required
  navItems: # required
    - title: 'Contact Me'
      href: '/contact'
  imageNavItems: # optional
    twitterUrl: 'https://twitter.com/'
    facebookUrl: 'https://facebook.com/'
    linkedinUrl: 'https://linkedin.com/'
    instagramUrl: 'https://instagram.com/'
    youtubeUrl: 'https://youtube.com/'
    githubUrl: 'https://github.com/'
```


#### Replace other essential content:
Placeholders of the following have been provided for simplicity. Complete the following to overwrite the placeholders.

- [ ] Replace the existing `favicon.ico` file within the `src/static/` directory.


## 5. Change the color palette (optional)
Change the color scheme of the website by editing `color` object within the `tailwind.config.js` file in the `src/` directory. You can find a small description for some of the properties below.

```js
cost COLORS = {
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

## 6. Write your first blog post (optional)

Now that you've done all the heavy lifting, your website should have a basic home page and be ready to serve some blog posts. \
If you haven't already, create a blog [section](./README.md#sections). Next, reference the [Posts section of the README](./README.md#posts-) for general information on writing a post.


## Running locally
### Environment setup
First, navigate to the project directory and ensure you're using the correct version of Node. Then, install the Node dependencies with [npm](https://www.npmjs.com/).
```bash
$ cd Build-A-Blog

# ensure node version is correct
$ nvm use

# install dependencies
$ npm install
```

<!-- ### Environment variables-->
### Run or generate the website
Once you've installed the necessary Node modules and configured your environment variables, you can run the application. Run the application using the command that is most appropriate for your environment.

```bash
# serve with hot reload at localhost:3000 - ideal for development
$ npm run dev

# generate static site files
$ npm run generate

# serve the static site
$ npm run start
```


### Testing 🧪

Unit tests can be run with the [Jest](https://jestjs.io/) test runner. End-to-end tests are run with [Cypress](https://www.cypress.io/). Note that the e2e tests are not recommended for use outside of the template itself (because it depends so heavily on the `src/content` folder).

```bash
# run unit tests
$ npm run unit
``` 

---

### Updating your website with new features in the template

If you want to bring new changes from the template repository into your website, utilize mutliple remote repositories with Git.

```bash
git remote add template git@github.com:cal-overflow/Build-A-Blog.git
# OR
git remote add template https://github.com/cal-overflow/Build-A-Blog.git

git fetch --all
git merge template/main
```

