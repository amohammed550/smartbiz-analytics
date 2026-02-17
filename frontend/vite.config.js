import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3200,
    proxy: {
      '/api': {
        // Dev only; use VITE_DEV_PROXY_TARGET to override (e.g. in Docker)
        target: process.env.VITE_DEV_PROXY_TARGET || 'http://localhost:5500',
        changeOrigin: true,
      },
    },
  },
})

