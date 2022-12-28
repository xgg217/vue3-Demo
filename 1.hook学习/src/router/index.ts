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
      path: '/table',
      name: 'table',
      component: () => import('../views/table/index.vue')
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: () => import('../views/transfer/index.vue')
    },
    {
      path: '/lazyload',
      name: 'lazyload',
      component: () => import('../views/Lazyload/index.vue')
    }
  ]
})

export default router
