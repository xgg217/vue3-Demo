import { RouteRecordRaw } from 'vue-router';
import Layout from '@/Layout/Layout.vue';
import Home from '@/views/Home.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('@/views/table/index.vue')
  },
  {
    path: '/Lazyload',
    name: 'Lazyload',
    component: () => import('@/views/Lazyload/index.vue')
  },
];

export {
  routes,
};

