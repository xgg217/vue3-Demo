import { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';

const routes: RouteRecordRaw[] = [
  {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/useRect',
      name: 'useRect',
      component: () => import('@/views/useRect/index.vue')
    },
    {
      path: '/useCountDown',
      name: 'useCountDown',
      component: () => import('@/views/useCountDown/index.vue')
    },
    {
      path: '/useToggle',
      name: 'useToggle',
      component: () => import('@/views/useToggle/index.vue')
    },
    {
      path: '/useWindowSize',
      name: 'useWindowSize',
      component: () => import('@/views/useWindowSize/index.vue')
    },
];

export {
  routes,
};

