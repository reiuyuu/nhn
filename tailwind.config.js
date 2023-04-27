const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: { max: '750px' },
    },
    extend: {
      fontFamily: {
        sans: ['Verdana', 'Geneva', ...defaultTheme.fontFamily.sans],
      },
    },
  },
}
