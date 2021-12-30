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
