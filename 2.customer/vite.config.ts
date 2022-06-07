import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 把src改为@
    },
  },

  plugins: [
    vue(),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],

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
