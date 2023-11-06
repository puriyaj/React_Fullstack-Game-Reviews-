/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,tsx,jsx}','./components/**/*.{js,tsx,jsx}'],
  theme: {
    extend: {
      fontFamily:
      {orbitron:['var(--font-orbitron)','sans-serif'],
    sans:['var(--font-exo)','sans-serif']
    }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

