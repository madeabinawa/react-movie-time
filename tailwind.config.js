module.exports = {
  content: [".index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [
    require('tailwind-scrollbar')
  ],
  variants: {
    scrollbar: ['rounded']
  },
  theme: {
    minHeight: {
      '36': '150px',
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "linear-gradient(to right bottom, rgba('#7ed56f',0.8), rgba('#28b485',0.8))",
      },
      rotate: {
        '25': '25deg',
      },
      transitionProperty: {
        width: "width",
      },
      colors: {
        primary: {
          500: "#503e9d",
          600: "#41327e",
        },
        dark: "#171818",
        gray: {
          400: "#969798",
          500: "#666666",
          700: "#353535",
          800: "#262626",
          900: "#171818",
        },
      },
    },
  },
};
