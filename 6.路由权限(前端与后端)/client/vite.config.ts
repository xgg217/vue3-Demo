import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 把src改为@
    },
  },

  plugins: [vue()],

  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.106:8888',
        changeOrigin: true, // 是否跨域
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
})
