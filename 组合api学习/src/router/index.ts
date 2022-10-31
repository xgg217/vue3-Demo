import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/OpJsq',
      component: () => import('@/views/OpJsq.vue')
    },
    {
      path: '/CmJsq',
      component: () => import('@/views/CmJsq/index.vue')
    },
    {
      path: '/setTitle',
      component: () => import('@/views/setTitle/index.vue')
    },
    {
      path: '/ScrollPosition',
      component: () => import('@/views/ScrollPosition/index.vue')
    }
  ]
})

export default router
