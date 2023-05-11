/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "cyan-light": "#EFFDFF"
      },
      colors: {
        "cyan-light": "#EFFDFF",
        "cyan-md-light": "#A1D1D8"
      },
      spacing: {
        '15px': '15px',
        '2px': '2px',
        '96-percent': '96%'

      },
      flex: {
        '2': '2 2 0%'
      },
      zIndex: {
        '3': '3',
      },
      maxWidth: {
        '200': '200px',
      }
    },
    fontSize: {
      'md-xs': '0.84rem',
      'xxs': '0.75rem'
    }
  },
  plugins: [],
}
