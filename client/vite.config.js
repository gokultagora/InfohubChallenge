import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Detect environment (local or production)
const isProduction = process.env.NODE_ENV === 'production'

// If deployed → use Render backend URL
// If local → use localhost:3001
const backendURL = isProduction
  ? 'https://infohubchallenge.onrender.com/'
  : 'http://localhost:3001'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: backendURL,
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'axios']
        }
      }
    }
  },
  define: {
    'process.env.BACKEND_URL': JSON.stringify(backendURL)
  }
})
