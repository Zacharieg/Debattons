/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors : {
      colorElements : "#000",
      colorPrimary : "#fca311",
      colorPrimaryHover : "#ec7411",
      colorSecondary : "#14213d",
      colorBgPrimary : "#ffffff",
      colorBgSecondary : "#e5e5e5",
    },
    fontFamily : {
      'display' : ["Dela Gothic One", 'Arial', 'sans-serif']
    },
    extend: {
      fontFamily: {
        'sans': ['Cabin', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}

