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
        },
        'zoom-in': {
          '0%': {
            transform: 'scale(0%)'
          },
          '100%': {
            transform: 'scale(100%)'
          }
        },
        'wave': {
          /* Animation source: https://jarv.is/notes/css-waving-hand-emoji/ */
          '0%': { transform: 'rotate( 0.0deg)' },
          '10%': { transform: 'rotate(14.0deg)' }, /* The following five values can be played with to make the waving more or less extreme */
          '20%': { transform: 'rotate(-8.0deg)' },
          '30%': { transform: 'rotate(14.0deg)' },
          '40%': { transform: 'rotate(-8.0deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate( 0.0deg)' },
          '100%': { transform: 'rotate( 0.0deg)' },
        }
      },
      animation: {
        'blur-fade-in-fast': 'blur-in 0.5s ease-in-out',
        'blur-fade-in': 'blur-in 1s ease-in-out',
        'blur-fade-in-slow': 'blur-in 1.5s ease-in-out',
        'fade-in-fast': 'fade-in 0.25s ease-in-out',
        'fade-in': 'fade-in 1s ease-in-out',
        'fade-in-slow': 'fade-in 1.5s ease-in-out',
        'hand-wave': 'wave 1.75s 2s 1',
        'zoom-in-slow': 'zoom-in 1.5s ease-in-out',
        'zoom-in': 'zoom-in 1s ease-in-out',
        'zoom-in-fast': 'zoom-in 0.5s ease-in-out',
        'zoom-out-slow': 'zoom-in reverse 1.5s ease-in-out',
        'zoom-out': 'zoom-in reverse 1s ease-in-out',
        'zoom-out-fast': 'zoom-in reverse 0.5s ease-in-out',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
};
