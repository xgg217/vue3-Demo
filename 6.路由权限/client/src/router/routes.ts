import { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/index',
    alias: '/',
    component: Home,
    meta: {
      name: '首页',
    }
  },


];

export {
  routes,
};

