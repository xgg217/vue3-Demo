import { defineStore, StoreDefinition } from 'pinia'
import type { IRoute } from "@/types/index";
import { getUserRouteList } from '@/api/index'

interface IState {
  uid: number;
  hasAuth: boolean;
  routeList: IRoute[];
  routeTree: IRoute[];
}


// 将列表转成树
const listToTree = (list: IRoute[]):IRoute[] => {
  const parents = list.filter(item => item.pid === 0);
  const children = list.filter(item => item.pid !== 0);

  function dataToTree(parents: IRoute[], children: IRoute[]) {
    parents.forEach(parent => {
      children.forEach((child, index) => {
        if(child.pid === parent.id) {
          let _children:IRoute[] = JSON.parse(JSON.stringify(children));
          _children.splice(index, 1);
          dataToTree([child], _children);
          if(parent.children) {
            parent.children.push(child);
          } else {
            parent.children = [child];
          }
        }
      })
    })
  }

  dataToTree(parents, children)

  return parents
}

export const useUsersStore = defineStore('rorte', {
  state: ():IState => {
    return {
      uid: 3, // 用户id
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

        this.setRouteList(res as unknown as IRoute[]);

        const arr = structuredClone(res) as unknown as IRoute[]
        this.setRouteTree(arr);

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
      this.routeTree = listToTree(routeList);
      console.log(this.routeTree);

    },

    // 设置权限
    setAuth(auth: boolean) {
      this.hasAuth = auth;
    }
  }
})
