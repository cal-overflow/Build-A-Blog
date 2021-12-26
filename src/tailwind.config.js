// const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        'red': '#e02b20',
        'secondary-red': '#ea6962',
        'blue': '#00addd',
        'pink': '#eaacd3',
        'lightGray': '#f4f4f6',
        'medGray': '#828282',
        'darkGray': '#2e2e2e',
      },
      fontFamily: {
        sans: ['"Poppins"', 'sans-serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
