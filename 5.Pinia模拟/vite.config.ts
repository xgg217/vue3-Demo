import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
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
        target: 'http://192.168.110.16:9090/',
        changeOrigin: true, // 是否跨域
        // rewrite: (path) => path.replace(/^\/user/, '')
      },
    },
  },
})
