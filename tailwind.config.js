const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '400px',
      mob: '510px',
      ...defaultTheme.screens,
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
