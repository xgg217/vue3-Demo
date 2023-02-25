import type { IRoute } from '@/types';
import type { RouteRecordRaw } from 'vue-router';

export function generateRouter(routeTree: IRoute[]): RouteRecordRaw[] {
  return routeTree.map((item) => {
    const route: RouteRecordRaw = {
      path: item.path,
      name: item.name,
      component: () => import(`@/views/${item.name}.vue`),
      children: []
    }

    if(item.children) {
      route.children = generateRouter(item.children)
    }

    return route;
  });
}

