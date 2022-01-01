// const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        'footer': '#292929',
        'main-light': '#FFFFFF',
        'main-dark': '#191919',
        'menu-light': '#E0E0E1',
        'menu-dark': '#1F1F1F',
        'card-light': '#EAEAEB',
        'card-dark': '#262626',
        'primary-light': '#A61E17',
        'primary-dark': '#00B4E6',
        'extra-gray-light': '#D5D5D7',
        'extra-gray-dark': '#5A5A5E',
        'shadow-dark': '#212121',
      },
      fontFamily: {
        sans: ['"Poppins"', 'sans-serif']
      },
      keyframes: {
        'blur-in': {
          '0%': {
            filter: 'blur(1rem)'
          },
          '100%': {
            filter: 'blur(0px)'
          }
        },
        'fade-in': {
          '0%': {
            opacity: '0%'
          },
          '100%': {
            opacity: '100%',
          }
        }
      },
      animation: {
        'blur-fade-in-fast': 'blur-in 0.5s ease-in-out',
        'blur-fade-in': 'blur-in 1s ease-in-out',
        'blur-fade-in-slow': 'blur-in 1.5s ease-in-out',
        'fade-in-fast': 'fade-in 0.25s ease-in-out',
        'fade-in': 'fade-in 1s ease-in-out',
        'fade-in-slow': 'fade-in 1.5s ease-in-out',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
