/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lightTheme: {
          darkSeaWave: '#01403c', //toolbar, borders, buttons
          lightBlue: '#eafffb', //background of pages
          brightLightBlue: '#1dcdab', //accented parts of pages
          lightMainText: '#fff', //accented light text, buttons text
          lightSecondaryText: '#d1d9db', //secondary light text
          darkMainText: '#061516',
          darkSecondaryText: '#165155',
          error: '#8e0808',
          warning: '#e1a918',
        },
      },
      boxShadow: {
        custom: '1px 0 30px black', // Кастомна тінь для тексту
      },
    },
  },
  plugins: [],
};
