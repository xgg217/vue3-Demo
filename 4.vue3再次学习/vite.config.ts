import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 把src改为@
    },
  },
  plugins: [vue()],

  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://mmobile.hk.test.cn-cic.com/',
        changeOrigin: true, // 是否跨域
        rewrite: (path:string) => path.replace(/^\/api/, ''),
      },
    },
  },
});
