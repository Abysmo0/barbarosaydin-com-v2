/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'fenerbahce-navy': '#0A2252',
        'brand-blue': '#023197ff',
        'calendly-blue': '#006BFF', // Yeni Calendly mavisi
      },
    },
  },
  plugins: [],
}