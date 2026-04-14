import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,

    // Using the IP from your screenshots so HMR connects properly
    hmr: {
      host: '10.11.11.40',
      port: 5173,
    },

    watch: {
      usePolling: true,
    },

    proxy: {
      // 1. Proxy static AdminLTE assets to the main Apache server
      '/dist': {
        target: 'https://10.11.11.250', // Target HTTPS directly to bypass Apache redirects
        changeOrigin: true,
        secure: false, // Bypass self-signed VM certs
      },
      '/plugins': {
        target: 'https://10.11.11.250',
        changeOrigin: true,
        secure: false,
      },

      // 2. Proxy API calls to the Flask backend
      '/api': {
        target: 'http://10.11.11.250:5001',
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