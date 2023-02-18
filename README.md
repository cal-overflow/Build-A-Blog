# Portfolio

A template website for blogging and showcasing work. \
Built primarily with [NuxtJS](https://nuxtjs.org/) and [TailwindCSS](https://tailwindcss.com/).

<details>

<summary>Click here to see an example (<a href="http://www.cal-overflow.dev">cal-overflow.dev</a>)</summary>

View the source code for the website [here](https://github.com/cal-overflow/site)
#### Light mode
[![Picture of home screen (light mode)](template/assets/preview-home-page-light.png)](http://www.cal-overflow.dev)

#### Dark mode
[![Picture of home screen (dark mode)](template/assets/preview-home-page-dark.png)](http://www.cal-overflow.dev)

</details>

<!-- Table of contents -->
### Table of contents
- [Getting Started](#make-the-site-your-own-)
- [Sections](#sections)
- [Blog posts](#blog-posts-)
<!--
- [Running locally](#running-locally) 
  - [Environment setup](#environment-setup)
  - [Environment variables](#environment-variables)
  - [Run or generate the website](#run-or-generate-the-website)
  - [Testing](#testing-)
-->

## Getting Started
**Make the site your own 👨‍💻** \
This portfolio was built to be "modular" so that the content and site structure is separate from the components themselves.

If you'd like a website similar to the author's ([cal-overflow.dev](http://www.cal-overflow.dev)), you can create one without needing to build it from scratch. 

[Click here to get started](./getting-started.md)

---

## Sections
Sections are defined as folders within the `src/content` folder. For instance, creating a `src/content/blog` folder will define a blog section within your website. **Each section must include an `index.md` defining metadata for the section.**

### Metadata
#### Required
1. A title for the section
1. A `primaryView` in which to render for the section's default route (i.e., `/blog/` for `src/content/blog/index.md`)
1. A `secondaryView` in which to render for the section's default route (i.e., `/blog/post-1` for `src/content/blog/post-1.md`)


#### Optional
1. A description for the section
1. A list of tags for the section. This can be an empty array if no tags are.


An example `index.md` metadata is shown below.
```yml
---
# Required
title: Blog
primaryView: post-feed # What view to show on /blog page
secondaryView: post-view # What is shown on pages like /blog/create-a-portfolio-site

# Optional
description: This is the blog section.
tags:
  - Software engineering
  - Tutorial
  - Econ
  - UI/UX
---
```

## Blog posts 📝
Blog posts are written in [Markdown](https://www.markdownguide.org/) and converted to HTML with the [Nuxt Content](https://content.nuxtjs.org/) module.

To write a blog post, create a markdown file within a section (i.e., `src/content/blog/`) directory. An [example post](http://www.cal-overflow.dev/post/download-snapchat-memories) is shown below.

```md
---
id: 2
title: How to create a really cool portfolio website
slug: create-a-portfolio-site
date: Janurary 7, 2023
img: website-layout.png
tags:
  - Software Engineering
  - Tutorial
---

As software engineers, we often create tons of really cool projects and want a place where we can show off our work.

Let's take a step-by-step look into how I made my portfolio.
<!--more-->

Steps: 
1. Clone the [template repository](https://github.com/cal-overflow/portfolio).
...
```

View the Nuxt docs on [Writing Content](https://content.nuxtjs.org/writing) for a detailed explanation on how to write blog posts.

Note that feature images should be placed in directory `src/assets/images/feature/`. Other post images should be placed in `src/static/blog-images/`. Reference the [source code for cal-overflow.dev](https://github.com/cal-overflow/site) as an example.

## Post tags
Post tags allow you to group posts within the same section together based on similarities such as topic. Post tags are defined in the sections `index.md` file.

Refer to the [sections](#sections) documentation above for more information on defining tags within a section.

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
```
<details>
  <summary>The purpose of each environment variable</summary>


  | Variable | Description | Required |
  | ----: | ------ | :--: |
  | `SITE_URL` | Utilized by the RSS feed generator to let readers know where they can find your site. | ✅ |
  | `FULL_NAME` | Utilized throughout the site.  | ✅ |
  | `EMAIL_ADDRESS` | Utilized for contact requests. | ✅ |
  | `SITE_NAME` | Utilized by the site to change the site title. If left blank, the `FULL_NAME` value is used. |  |

  Note that each environment variable name is preceded by `NUXT_ENV_` so that it is easily accessible by the nuxt application. Refer to Nuxt's [Environment Variables documentation](https://nuxtjs.org/docs/configuration-glossary/configuration-env/#automatic-injection-of-environment-variables).
</details>

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

### Updating your website with new features in the template

If you want to bring new changes from the template repository into your website, utilize mutliple remote repositories with Git.

```bash
git remote add template git@github.com:cal-overflow/portfolio.git
# OR
git remote add template https://github.com/cal-overflow/portfolio.git

git fetch --all
git merge template/main
```
