const { tailwindTheme } = require('@sabersprops/ui/src/theme/tailwindTheme.theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}', '../../packages/ui/src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: tailwindTheme,
  },
  plugins: [require('tailwindcss-animate')],
};
