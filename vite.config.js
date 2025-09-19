import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config with dev proxy to backend API to avoid CORS issues in development
// Allow overriding proxy target when running in Docker
const proxyTarget = process.env.VITE_PROXY_TARGET || 'http://localhost:3001'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: proxyTarget,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})