import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  build: {
    chunkSizeWarningLimit: 1600,
    // rollupOptions: {
    // external: [
    //  "orbitcontrols", // ignore stuff
    // ],
    // },
  },

})

