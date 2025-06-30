/** @type {import('tailwindcss').Config} */
import plugin from 'flowbite/plugin';

const config = {
  darkMode: 'class',

  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      // Optional: add custom colors or utilities here
    },
  },
  plugins: [
    plugin,
    function ({ addBase, theme }) {
      addBase({
        'input, select, textarea': {
          backgroundColor: theme('colors.white'),
          color: theme('colors.gray.900'),
        },
        '.dark input, .dark select, .dark textarea': {
          backgroundColor: theme('colors.gray.800'),
          color: theme('colors.white'),
          borderColor: theme('colors.gray.600'),
        },
        '.dark ::placeholder': {
          color: theme('colors.gray.400'),
        },
      });
    },
  ],
};

export default config;
