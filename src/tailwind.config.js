// const defaultTheme = require('tailwindcss/defaultTheme');
const COLORS = {
  'footer': '#292929',            // Background color of footer
  'main-light': '#FFFFFF',        // Page background color in light mode
  'main-dark': '#191919',         // Page background color in dark mode
  'menu-light': '#E0E0E1',        // Background color of menu bar in light mode
  'menu-dark': '#1F1F1F',         // Background color of menu bar in dark mode
  'card-light': '#EAEAEB',        // Background color of each card in light mode
  'card-dark': '#262626',         // Background color of each card in dark mode
  'primary-light': '#A61E17',     // Primary color in light mode (red)
  'primary-dark': '#00B4E6',      // Primary color in dark mode (light blue)
  'extra-gray-light': '#D5D5D7',  // Extra gray color in light mode
  'extra-gray-dark': '#5A5A5E',   // Extra gray color in dark mode
  'shadow-dark': '#212121',       // Dark shadow color
};

module.exports = {
  theme: {
    extend: {
      colors: { ...COLORS },
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
        },
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
        'rotate-upside-down': 'rotate-upside-down 0.25s ease-in-out'
      },
      typography: {
        DEFAULT: {
          css: {
            'blockquote p:first-of-type::before': false,
            'blockquote p:first-of-type::after': false,
            blockquote: {
              color: "inherit",
              fontStyle: 'normal',
              marginLeft: "1rem",
              paddingLeft: "1rem",
            }
          }
        },
        'blockquote-light': {
          css: {
            blockquote: {
              borderLeftColor: COLORS["extra-gray-light"],
            }
          }
        },
        'blockquote-dark': {
          css: {
            blockquote: {
              borderLeftColor: COLORS["extra-gray-dark"],
            }
          }
        },
        details: {
          css: {
            details: {
              padding: "16px",
              margin: "12px 0px 12px 0px",
              borderWidth: "4px",
              borderRadius: "10px",
            },
            summary: {
              fontWeight: "bold",
              cursor: "pointer"
            }
          },
        },
        'details-light': {
          css: {
            details: {
              borderColor: COLORS["extra-gray-light"],
            },
            summary: {
              color: COLORS["primary-light"],
            },
          }
        },
        'details-dark': {
          css: {
            details: {
              borderColor: COLORS["extra-gray-dark"],
            },
            summary: {
              color: COLORS["primary-dark"],
            },
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
