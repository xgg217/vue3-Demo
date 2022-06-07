import { RouteRecordRaw } from 'vue-router';
import Layout from '@/Layout/Layout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/index',
    redirect: '/index/home',
    alias: '/',
    component: Layout,
    meta: {
      name: '首页',
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/HomesViews.vue'),
        meta: {
          name: '首页',
        },
      },
    ],
  },

  {
    path: '/user',
    redirect: '/user/myuser',
    meta: {
      name: '用户',
    },
    component: Layout,
    children: [
      {
        path: 'myuser',
        component: () => import('@/views/User/MyUser.vue'),
        meta: {
          name: '用户',
        },
      },
      {
        path: 'myuser2',
        component: () => import('@/views/User/MyUser2.vue'),
        meta: {
          name: '用户2',
        },
      },
    ],
  },
];

export {
  routes,
};

