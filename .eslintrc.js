module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'prettier',
    'plugin:cypress/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    semi: ["error", "always"],
    "vue/component-definition-name-casing": ["error", "kebab-case"],
    "eol-last": ["error", "always"] ,
    "cypress/no-unnecessary-waiting": "off",
  },
  globals: {
    cy: true
  }
};
