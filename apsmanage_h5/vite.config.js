import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import eslintPlugin from 'vite-plugin-eslint'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import unoCss from 'unocss/vite'
// import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import viteCompression from 'vite-plugin-compression';


function resolve (dir) {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  // 配置项目别名
  // base:'/apsmanage/',
  resolve: {
    alias: {
      '@': resolve('./src'),
      '@components': resolve('./src/components'),
      '@store': resolve('./src/store'),
      '@views': resolve('./src/views'),
      '@images': resolve('./src/assets/images')
    }
  },
  // 公共样式
  css: {
    // 全局scss变量
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variable.scss";'
      }
    }
  },
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    }),
    AutoImport({
      // 按需引入element plus
      resolvers: [ElementPlusResolver()],
      // 自动引入vue等api
      imports: [
        'vue', 'vue-router', 'pinia'
      ],
      // dts: 'src/auto-import.d.ts', // 默认注释。生成一次就可以，避免每次工程启动都生成
      eslintrc: {
        enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
        filepath: './.eslintrc-auto-import.json', // 生成json文件
        globalsPropValue: true
      }
    }),
    Components({
      resolvers: [ElementPlusResolver(), VantResolver()]
    }),
    // vueJsx({}),
    viteCompression(),
    unoCss({
      presets: [presetUno(), presetAttributify(), presetIcons()],
      rules: [
        [/^fz-(\d+)$/, match => ({ 'font-size': `${match[1] / 3.75}vw` })], // 直接class上写 fz-10之类的即可
        [/^mg-(\d+)$/, match => ({ margin: `${match[1] / 3.75}vw` })],
        [/^mt-(\d+)$/, match => ({ 'margin-top': `${match[1] / 3.75}vw` })],
        [/^ml-(\d+)$/, match => ({ 'margin-left': `${match[1] / 3.75}vw` })],
        [/^mr-(\d+)$/, match => ({ 'margin-right': `${match[1] / 3.75}vw` })],
        [/^mb-(\d+)$/, match => ({ 'margin-bottom': `${match[1] / 3.75}vw` })],
        [/^pd-(\d+)$/, match => ({ 'padding': `${match[1] / 3.75}vw` })],
        [/^pl-(\d+)$/, match => ({ 'padding-left': `${match[1] / 3.75}vw` })],
        [/^pt-(\d+)$/, match => ({ 'padding-top': `${match[1] / 3.75}vw` })],
        [/^pr-(\d+)$/, match => ({ 'padding-right': `${match[1] / 3.75}vw` })],
        [/^pb-(\d+)$/, match => ({ 'padding-bottom': `${match[1] / 3.75}vw` })],
        [/^ti-(\d+)$/, match => ({ 'text-indent': `${match[1] / 3.75}vw` })],
        [/^width-(\d+)$/, match => ({ 'width': `${match[1] / 3.75}vw` })]
      ]
    })
  ],
  // build:{
  //   minify:'terser',
  //   terserOptions:{
  //     // 生产环境时移除console
  //     compress:{
  //       drop_console:true,
  //       drop_debugger:true
  //     }
  //   }
  // },
  server:{
    port: 4500,
    host: '0.0.0.0',
    proxy: {
      // "/api": {
      //   target: "http://192.168.8.136:7778",
      //   target: "http://192.168.12.171:8091",
      //   target: "http://192.168.18.131:8091",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, "")
      // },
    }
  }
})
