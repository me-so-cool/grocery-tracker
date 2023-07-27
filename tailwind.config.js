/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-1' : '#22577a'
      },
      spacing: {
        '500px' : '500px'
        
      }
    },
  },
  plugins: [],
}