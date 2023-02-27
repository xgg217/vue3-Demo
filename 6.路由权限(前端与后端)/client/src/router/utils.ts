import type { IRoute } from '@/types';
import type { Router, RouteRecordRaw } from 'vue-router';
import { useUsersStore}  from '@/store/route';

// const usersStore = useUsersStore()
// console.log(useUsersStore());

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

export function routerBeforeEach(router:Router, store: any) {
  router.beforeEach((to, from, next) => {
    if(store.hasAuth) {
      next();
      return;
    }

    return store.asyncGetRouteListApi().then(() => {
      const newRouters = generateRouter(store.routeTree);
      newRouters.forEach(item => {
        router.addRoute(item);
      });
      next({ path: to.path })
    }).catch((err: any) => {
      console.error(err);
    });
  })

}

