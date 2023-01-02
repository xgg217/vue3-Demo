import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  ]
})

export default router
