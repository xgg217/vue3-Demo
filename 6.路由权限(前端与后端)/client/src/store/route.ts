import { defineStore } from 'pinia'
import type { IRoute } from "@/types/index";
import { getUserRouteList } from '@/api/index'

export const useUsersStore = defineStore('rorte', {
  state: () => {
    return {
      uid: 0, // 用户id
      hasAuth: false, // 是否有权限
      routeList: [] as IRoute[], // 路由列表
      routeTree: [] as IRoute[] // 路由树
    }
  },

  actions: {
    // 获取路由列表
    asyncGetRouteListApi() {
      return getUserRouteList(this.uid).then(res => {
        console.log(res);

        // return res
      }).catch(err => {
        console.error(err);
      })
    },

    // 设置路由列表
    setRouteList(routeList: IRoute[]) {
      this.routeList = routeList;
    },

    // 设置路由树
    setRouteTree(routeList: IRoute[]) {

    },

    // 设置权限
    setAuth(auth: boolean) {
      this.hasAuth = auth;
    }
  }
})