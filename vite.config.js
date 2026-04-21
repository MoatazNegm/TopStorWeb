import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,

    // Using dynamic host for HMR to work through proxies correctly
    hmr: {
      port: 5173,
    },

    watch: {
      usePolling: true,
    },

    proxy: {
      // 1. Proxy static AdminLTE assets to the main Apache server
      '/dist': {
        target: 'http://shttpd', // Using internal container name
        changeOrigin: true,
        secure: false,
      },
      '/plugins': {
        target: 'http://shttpd',
        changeOrigin: true,
        secure: false,
      },

      // 2. Proxy API calls to the Flask backend
      '/api': {
        target: 'http://apisrv:5001', // Using internal container name
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