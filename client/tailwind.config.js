/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        main: {
          dark: '#141414',
          light: '#202124',
        },
      },
      padding: {
        main: '2rem 2.5rem 2rem 2.5rem',
      },
    },
  },
  plugins: [],
};
