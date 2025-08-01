import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  base: '/React-Acko-Weather-App/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/hooks': resolve(__dirname, './src/hooks'),
      '@/state': resolve(__dirname, './src/state'),
      '@/types': resolve(__dirname, './src/types'),
      '@/utils': resolve(__dirname, './src/utils'),
      '@/util': resolve(__dirname, './src/util'),
      '@/config': resolve(__dirname, './src/config'),
      '@/data': resolve(__dirname, './src/data'),
      '@/containers': resolve(__dirname, './src/containers'),
    },
  },
})
