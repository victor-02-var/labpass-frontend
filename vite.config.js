import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: true,
    proxy: {
      '/socket.io': {
        target: 'http://192.168.1.2:5000',
        ws: true, // This is the critical part for WebSockets
      },
    },
  },
})
