/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "bg-blur": "rgba(30, 30, 30, 0.6)", // Warna dengan transparansi
      },
      fontFamily: {
        "contrail-one": ["Contrail One", "serif"],
      },
      colors: {},
    },
  },
  plugins: [],
};
