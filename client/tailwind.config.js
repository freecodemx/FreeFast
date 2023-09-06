/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'sm': '820px', // Tamaño para dispositivos pequeños
      },
      gridColumn: {
        '1': '1',
        '2': '2',
        '3': '3',
      },
      gridTemplateColumns: {
        '1': '1fr', // Una columna
        '3': 'repeat(3, minmax(0, 1fr))', // Tres columnas
      },
    },
  },
  plugins: [],
}