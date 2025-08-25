const { tailwindTheme } = require('@sabersprops/ui/src/theme/tailwindTheme.theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}', '../../packages/ui/src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('tailwindcss-animate')],
  presets: [require('nativewind/preset')],
  theme: {
    extend: tailwindTheme,
  },
};
