import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    sourcemap: true,
    rolldownOptions: {
      output: {
        // Long-lived vendor chunks so app deploys don't bust framework caches.
        codeSplitting: {
          groups: [
            {
              name: 'react',
              test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            },
            { name: 'router', test: /node_modules[\\/]react-router/ },
            { name: 'query', test: /node_modules[\\/]@tanstack/ },
            {
              name: 'ui',
              test: /node_modules[\\/](@radix-ui|radix-ui|@floating-ui|cmdk|sonner)/,
            },
          ],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    env: {
      VITE_OPENWEATHER_API_KEY: 'test-key',
    },
  },
})
