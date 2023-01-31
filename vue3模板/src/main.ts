import { createApp } from 'vue'
import router from './router/index';
import './assets/reset.css';
import App from './App.vue'

createApp(App).use(router).mount('#app')
