/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
