/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'h1': ['40px', { lineHeight: '50px', fontWeight: '800' }],
        'h2': ['24px', { lineHeight: '40px', fontWeight: '700' }],
        'h3': ['20px', { lineHeight: '30px', fontWeight: '600' }],
        'h4': ['16px', { lineHeight: '25px', fontWeight: '500' }],
        'h5': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'h6': ['12px', { lineHeight: '20px', fontWeight: '300' }],
      },
    },
  },
  plugins: [],
}