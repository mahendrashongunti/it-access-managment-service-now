import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/client/components'),
      '@pages': path.resolve(__dirname, './src/client/pages'),
      '@services': path.resolve(__dirname, './src/client/services'),
      '@hooks': path.resolve(__dirname, './src/client/hooks'),
      '@types': path.resolve(__dirname, './src/client/types'),
      '@utils': path.resolve(__dirname, './src/client/utils'),
      '@layouts': path.resolve(__dirname, './src/client/layouts'),
      '@context': path.resolve(__dirname, './src/client/context'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
