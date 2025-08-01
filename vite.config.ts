import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
      '@': '/src',
      '@/components': '/src/components',
      '@/hooks': '/src/hooks',
      '@/state': '/src/state',
      '@/types': '/src/types',
      '@/utils': '/src/utils',
      '@/util': '/src/util',
      '@/config': '/src/config',
      '@/data': '/src/data',
      '@/containers': '/src/containers',
    },
  },
})
