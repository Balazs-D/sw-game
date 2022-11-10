/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.vue'],
  theme: {
    extend: {
      fontFamily: {
        anakin: ['AnakinMono', 'monospace'],
        episode: ['EpisodeOne', 'monospace'],
        classic: ['Classic', 'monospace'],
        distorted: ['Distorted', 'monospace'],
      },
      backgroundImage: {
        intro: "url('~/assets/images/sw-bg-01.jpeg')",
        stars: "url('~/assets/images/sw-bg-02.jpeg')",
        jedi: "url('~/assets/images/jedi.jpeg')",
        sith: "url('~/assets/images/sith.jpeg')",
        fight: "url('~/assets/images/fight.jpeg')",
      },
      colors: {
        ocean: '#16c0b0',
        leaf: '#84cf6a',
        mist: '#d8d8d8',
        midnight: '#39495c',
        cloud: '#ffffff',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
