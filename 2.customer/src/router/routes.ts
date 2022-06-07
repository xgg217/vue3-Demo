import { RouteRecordRaw } from 'vue-router';
import Layout from '@/Layout/index.vue';

//
const routes:RouteRecordRaw[] = [
  {
    path: '/index',
    name: 'index',
    redirect: '/index/home',
    alias: '/',
    component: Layout,
    meta: {
      name: '首页',
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home/MyHome.vue'),
        meta: {
          name: '首页',
        },
      },
    ],
  },

  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: '/user/myuser',
    meta: {
      name: '用户',
    },
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

// 其他 非Layout 路由
const otherRoutes:RouteRecordRaw[] = [
  { path: '/login', name: 'login', component: () => import('@/views/Login/MyLogin.vue'), meta: { name: '登录' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/404.vue'), meta: { name: '404' } }, // 404 页面
];

export {
  routes,
  otherRoutes,
};

