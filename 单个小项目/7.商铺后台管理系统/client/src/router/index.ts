import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Layout from '@/Layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,

      children: [
        {
          path: 'index',
          name: 'index',
          component: () => import('../views/RolsList/index.vue')
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('../views/User/index.vue')
        }
      ]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // },
  ]
})

export default router
