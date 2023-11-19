import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'deep-blue': '#C2DEDC',
        'deep-dark-blue': '#116A7B'
      },
      colors: {
        'font': '#116A7B'
      },
      fontFamily: {
        'body': ['Bebas Neue'],
        'display': ['Oswald'],
      }
    },
  },
  plugins: [],
}
export default config
