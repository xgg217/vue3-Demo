import { createRouter, createWebHistory } from 'vue-router';
import { routes, otherRoutes } from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, ...otherRoutes],
});

router.afterEach((to, from, failure) => {

  console.log(to); // 进入
  console.log(from); // 离开
  console.log(failure);

  // 修改浏览器标题
  document.title = (to.meta.name as string) + ` - ${import.meta.env.VITE_TITLE_NAME}`;
});

export default router;
