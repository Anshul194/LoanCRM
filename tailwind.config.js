/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#2F3287",
      },
      backgroundColor: {
        accent: '#2F3287',
      },
      textColor: {
        accent: '#2F3287',
      },
      btnClr:'#2F3287',
    },
  },
  plugins: [],
};
