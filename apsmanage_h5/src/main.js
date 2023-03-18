import { createApp } from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import './plugins/vant'
import './plugins/element'
import directives from './directives/index'
import nprogress from './plugins/nprogress'
import 'uno.css'
import '@/styles/apsbase.css'
import '@/styles/base.scss'
import '@vant/touch-emulator'

import echarts from './plugins/echarts.js'
import '@/utils/getTaskId'

/* 全屏事件 */
window.cancelFullScreenEvent = null
/* 选人组件区分key */
window.selectCurrentKey = ''

const app = createApp(App)
directives(app) // 注册全局自定义指令
nprogress(router)
app.config.globalProperties.$echarts = echarts; //按需注册echarts
app.use(store)
app.use(router)
app.mount('#app')

/* 设置主题色 */
document.body.style.setProperty('--el-color-primary', '#1572F9')
