const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
    fontFamily: {
      lora: ['Lora', 'serif'],
      inter: ['Inter', 'serif'],
    }
  },
  plugins: [],
  darkMode: 'media',
  plugins: [nextui()]
};
