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
      path: '/useTitle',
      name: 'useTitle',
      component: () => import('@/views/useTitle/index.vue')
    },
    {
      path: '/useClipboard',
      name: 'useClipboard',
      component: () => import('@/views/useClipboard/index.vue')
    },
    {
      path: '/useColorMode',
      name: 'useColorMode',
      component: () => import('@/views/useColorMode/index.vue')
    },
  
  ]
})

export default router
