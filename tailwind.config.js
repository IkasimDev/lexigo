/** @type {import('tailwindcss').Config} */
module.exports = {
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
        columnDisabled: "var(--disabled)",
        columnColor: "#758aab"
      },
      animation: {
        'type': 'type 0.15s ease-out 1'
      },
      keyframes: {
        type: {
          '0%': {
            transform: 'perspective(200px) translateZ(0)',
            color: 'transparent',
          },
          '25%': {
            transform: 'perspective(200px) translateZ(30px)',
            color: '#FAFAFF',
          },
          '100%': {
            transform: 'perspective(200px) translateZ(0)',
            color: '#FAFAFF',
          },
        }
      }
    },
  },
  plugins: [],
};
