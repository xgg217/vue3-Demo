import type { IRoute } from '@/types';
import { Store, StoreDefinition } from 'pinia';
import type { Router, RouteRecordRaw } from 'vue-router';


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

export function routerBeforeEach(router:Router, store:Store<"rorte">) {
  router.beforeEach((to, from, next) => {
    if(store.hasAuth) {
      next();
      return;
    }

    return store.asyncGetRouteListApi().then(() => {
      const newRouters = generateRouter(store.state.route.routeTree);
      newRouters.forEach(item => {
        router.addRoute(item);
      });
      next({ path: to.path })
    }).catch((err: any) => {
      console.error(err);
    });
  })

  // router.beforeEach((to, from, next) => {
  //   if(to.path === '/login') {
  //     next();
  //   } else {
  //     if(store.state.route.hasAuth) {
  //       next();
  //     } else {
  //       store.dispatch('asyncGetRouteListApi').then(() => {
  //         const routeTree = store.state.route.routeTree;
  //         const routes = generateRouter(routeTree);
  //         router.addRoute(routes);
  //         next({ ...to, replace: true });
  //       })
  //     }
  //   }
  // })
}

