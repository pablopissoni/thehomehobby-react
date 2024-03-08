/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00ADDB",
        secondary: "#9E0B0B",
        star: "#fccc00b3",
        fondo: "#E3E6E6",
      },
      boxShadow: {
        custom1:
          "0 0.1rem 0.15rem rgba(40, 36, 89, 0.2), 0 0.25rem 0.4rem rgba(40, 36, 89, 0.15)",
      },
    },
  },
  plugins: [],
};
