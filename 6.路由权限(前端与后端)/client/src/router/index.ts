import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
// import { routes } from './routes';

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

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes],
});



export default router;