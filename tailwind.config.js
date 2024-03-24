/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      encodeSans: ['encode-sans', 'sans-serif'],
    },
    extend: {
      colors: {
        neutral1: '#FFFFFF',
        neutral2: '#94979A',
        neutral3: '#393D41',
        neutral4: '#2C2F33',
        neutral5: '#222528',
        primary1: '#F4CCC8',
        primary2: '#EBA59E',
        primary3: '#E27D73',
        primary4: '#DA584B',
        secondary1: '#C8E1BC',
        tertiary1: '#F9EEd7',
      },
    },
  },
  plugins: [],
};
