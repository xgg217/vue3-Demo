import type { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
    meta: {
      name: '首页',
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  }
];

export {
  routes,
};

