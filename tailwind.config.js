/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      backgroundColor: {
        main: '#121212',
        sub: '#1E1E1E',
      },
      textColor: {
        main: '#F5F5F5',
        sub: '#D4D4D4',
      },
    },
  },
  plugins: [],
};
