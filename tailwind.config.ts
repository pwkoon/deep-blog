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
        'deep-dark-blue': '#116A7B',
        'deep-header': '#FAF3F0'
      },
      backgroundImage: {
        'deep-ocean': "url('https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=1852&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        'deep-turtle': "url('https://images.unsplash.com/photo-1591025207163-942350e47db2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        'deep-safari': "url('https://plus.unsplash.com/premium_photo-1661936361131-c421746dcd0d?q=80&w=1918&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        'deep-login': "url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        'deep-register': "url('https://images.unsplash.com/photo-1682686581312-506a8b53190e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      },
      colors: {
        'font-blue': '#116A7B',
        'font-sand': '#F4DFC8'
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
