import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,

    // HMR must go through Apache's HTTPS port (443), not directly to Vite's plain HTTP port (5173).
    // Apache's WebSocket proxy rule (Upgrade: websocket → ws://MYCLUSTER:5173) handles the forwarding.
    hmr: {
      protocol: 'wss',
      clientPort: 443,
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