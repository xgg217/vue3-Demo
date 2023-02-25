import { defineStore } from 'pinia'
import type { IRoute, IRouteTree } from "@/types/index";
import { getUserRouteList } from '@/api/index'

// 将列表转成树
const listToTree = (list: IRouteTree[]):IRouteTree[] => {
  const parents = list.filter(item => item.pid === 0);
  const children = list.filter(item => item.pid !== 0);

  dataToTree(parents, children)

  return parents

  function dataToTree(parents: IRouteTree[], children: IRouteTree[]) {
    parents.forEach(parent => {
      children.forEach((child, index) => {
        if(child.pid === parent.id) {
          let _children:IRouteTree[] = JSON.parse(JSON.stringify(children));
          _children.slice(index, 1);
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

  // return list.reduce((acc , cur) => {
  //   const { pid } = cur;
  //   if (pid === 0) {
  //     (acc as IRouteTree[]).push(cur);
  //   } else {
  //     const parent = list.find(item => item.id === pid);
  //     if(!parent) return acc;
  //     parent.children = parent?.children?? [];
  //     parent.children.push(cur);
  //   }
  //   return acc;
  // }, []);
}

export const useUsersStore = defineStore('rorte', {
  state: () => {
    return {
      uid: 2, // 用户id
      hasAuth: false, // 是否有权限
      routeList: [] as IRoute[], // 路由列表
      routeTree: [] as IRouteTree[] // 路由树
    }
  },

  actions: {
    // 获取路由列表
    asyncGetRouteListApi() {
      return getUserRouteList(this.uid).then(res => {
        console.log(res);

        this.setRouteList(res as unknown as IRoute[]);

        const arr = structuredClone(res) as unknown as IRouteTree[]
        // this.setRouteTree(arr);
        console.log(arr);

      }).catch(err => {
        console.error(err);
      })
    },

    // 设置路由列表
    setRouteList(routeList: IRoute[]) {
      this.routeList = routeList;
    },

    // 设置路由树
    setRouteTree(routeList: IRouteTree[]) {

      // this.routeTree = listToTree(routeList);
    },

    // 设置权限
    setAuth(auth: boolean) {
      this.hasAuth = auth;
    }
  }
})