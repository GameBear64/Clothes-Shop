/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'xs': '430px',
      ...defaultTheme.screens
    },
    extend: {
      colors: {
        'base-strong': 'var(--base-strong)',
        base: 'var(--base)',
        'base-moderate': 'var(--base-moderate)',
        'base-subtle': 'var(--base-subtle)',
        'base-weak': 'var(--base-weak)',
        primaryText: 'var(--primaryText)',
        secondaryText: 'var(--secondaryText)',
        'primary-light': 'var(--primary-light)',
        primary: 'var(--primary)',
        'primary-shade': 'var(--primary-shade)',
        'primary-dark': 'var(--primary-dark)',
      },
    },
    fontFamily: {
      code: 'Cascadia Code',
    },
  },
  plugins: [],
};
