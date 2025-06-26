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
    extend: {},
  },
  plugins: [
    plugin,
  ],
};

export default config;
