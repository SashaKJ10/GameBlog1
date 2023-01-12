/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        13: '14.25rem',
        500: '500px',
        15: '15em',

        128: '32rem',
        1250: '1250px',
        100: '100vh',
        101: '100vw',
        96: '96vh',
        211: '211px',
        375: '375px',
        960: '960px',
      },
    },
  },
  plugins: [],
};
