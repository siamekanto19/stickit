module.exports = {
  purge: {
    enabled: true,
    content: ['./*.html', './src/*/*.jsx', './src/*.jsx'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      borderWidth: ['hover'],
      zIndex: ['hover']
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
