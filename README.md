# Portfolio [![Netlify Status](https://api.netlify.com/api/v1/badges/15085e05-f139-4f5f-a673-6bf86682c401/deploy-status)](https://app.netlify.com/sites/christianlisle/deploys)

Personal website for blogging and showcasing my work.

Built primarily with [NuxtJS](https://nuxtjs.org/) and [TailwindCSS](https://tailwindcss.com/).



## Build Setup

```bash
# ensure node version is correct
$ nvm use

# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

### Testing [![portfolio](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/ap95b9&style=flat-square&logo=cypress)](https://dashboard.cypress.io/projects/ap95b9/runs)

#### Unit tests
Unit tests can be run with the [Jest](https://jestjs.io/) test runner.

```bash
# install dependencies (if not already done)
$ npm install

# run unit tests
$ npm run unit
```

#### E2E tests
End-to-end tests can be run with [Cypress](https://www.cypress.io/). 

```bash
# install dependencies (if not already done)
$ npm install

# run e2e tests
npm run e2e

# run e2e in headless mode
npm run e2e:headless

# run e2e by connecting to an already-running server
npm run e2e:live
```
