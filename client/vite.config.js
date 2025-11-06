import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Render backend URL
const backendURL = 'https://infohubchallenge.onrender.com'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // dev server port (won't matter on Render)
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
