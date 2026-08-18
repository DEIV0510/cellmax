import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5250, host: true, open: false },
  preview: { port: 5250 },
  build: {
    target: 'es2019',
    assetsInlineLimit: 2048,
    chunkSizeWarningLimit: 900,
  },
})
