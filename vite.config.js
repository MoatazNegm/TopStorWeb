import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      /* 
      '/dist': {
        target: 'http://localhost/', 
        changeOrigin: true,
      },
      '/plugins': {
        target: 'http://localhost/',
        changeOrigin: true,
      }, 
      */
      '/api': {
        target: 'http://localhost:8080', // Replace with your actual backend port if strictly needed, or mock.
        // For now, if we are just testing UI, we might mock or rely on relative paths if served from same root.
        // But since we are using Vite dev server, we need to proxy API calls to the real backend.
        // Let's assume standard PHP setup on port 80 or 8080.
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'build_react',
    emptyOutDir: true,
  }
})
