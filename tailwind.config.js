const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'roboto-mono': ["'Roboto Mono'", 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      width: {
        '85vw': '85vw',
        '420px': '420px',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },

    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
