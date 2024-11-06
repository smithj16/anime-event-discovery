/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        galactic: {
          background: '#121212',
          primary: '#6200EA',
          secondary: '#03DAC6',
          accent: '#BB86FC',
          text: '#E0E0E0',
          darkGray: '#1E1E1E',
          lightGray: '#2C2C2C',
          deepElectricPurple: '#4A00C8',
          lightElectricPurple: '#7A33EA',
          softCyanGreen: '#66E8D4',
          deepCyanGreen: '#009688',
          softLavender: '#D8B6FC',
          deepLavender: '#8E24AA',
          complementaryYellow: '#FDD835',
          complementaryOrange: '#FF7043',
        },
      },
      backgroundImage: {
        'cosmic-1': 'linear-gradient(135deg, #4A00C8, #7A33EA, #03DAC6, #FF4081)',
        'cosmic-2': 'linear-gradient(135deg, #121212, #009688, #8E24AA, #FDD835)',
        'cosmic-3': 'linear-gradient(135deg, #FF4081, #6200EA, #009688, #D8B6FC)',
        'cosmic-4': 'linear-gradient(135deg, #FDD835, #BB86FC, #66E8D4)',
        'cosmic-5': 'linear-gradient(135deg, #6200EA, #FF7043, #4A00C8, #FF4081)',
        'custom-gradient': 'linear-gradient(to top, #0250c5 0%, #d43f8d 100%)'
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('autoprefixer'),
    require('@tailwindcss/forms')
  ],
}