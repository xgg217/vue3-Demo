import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    proxy: {
      '/upms': {
        target: 'http://192.168.28.51:30188',
        changeOrigin: true, // 是否跨域
        rewrite: (path) => path.replace(/^\/upms/, '')
      },
      '/meeting': {
        target: 'http://192.168.11.110:8200',
        changeOrigin: true, // 是否跨域
        rewrite: (path) => path.replace(/^\/meeting/, '')
      },
    },
  }

})
