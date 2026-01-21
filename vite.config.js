import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/webgis-jabar-bencana/',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
