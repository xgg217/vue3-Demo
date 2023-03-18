import { createRouter, createWebHashHistory } from 'vue-router'
import {setTitle, auth, notDingTalk} from "@/utils/ddApi"
import To from 'await-to-js';
import {useUserStore} from "@/store/user";
import workbench from './workbench';
import setProject from './setProject';
import quote from './quote';
import myClient from './myClient';
import prodFow from './prodFow';
import fcs from './fcs';
import sesstionStorage from "@/utils/sessionStorage"
import borrowPlate from "@/router/borrowPlate";

const noAuth=['404','statusError','login',"pc","workbench","borrowPlateCustomerConfirmation","share"] //不用鉴权的页面
const routes = [
  //我的客户
  myClient,
  //pp1-pp20
  prodFow,
  //报价
  quote,
  //立项
  setProject,
  fcs,
  // 借板
  borrowPlate,
  // app工作台
  ...workbench,
  //钉钉工作台中转页
  { path: '/pc', name: 'pc', meta: { title: '榕树报告' }, component: () => import(/* webpackChunkName: "pc" */ '@/views/pc/index.vue') },
  { path: '/down', name: 'down', meta: { title: '下载页' }, component: () => import(/* webpackChunkName: "pc" */ '@/views/pc/down.vue') },
  { path: '/statusError', name: 'statusError', meta: { title: '状态错误' },component: () => import(/* webpackChunkName: "statusError" */ '@/views/statusError/statusError.vue') },
  { path: '/login', name: 'login',component: () => import(/* webpackChunkName: "login" */ '@/views/login/login.vue') },
  { path: '/demo', name: 'demo',component: () => import(/* webpackChunkName: "demo" */ '@/views/demo/demo.vue') },
  { path: '/share/:key', name: 'share',component: () => import(/* webpackChunkName: "share" */ '@/views/share/index.vue') },
  { path: '/:pathMatch(.*)*', name: '404', meta: { title: '' },component: () => import(/* webpackChunkName: "404" */ '@/views/404/index.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})


router.beforeEach(async (to, from, next) => {
  setTitle(to.meta.title)
  /* 设置备料领料任务title */
  if((to.name == 'stock' || to.name == 'stockDetail') && to.params.type == 3) {
    setTitle("领料任务")
  }
  const {token=''} = storeToRefs(useUserStore())
  const isNoAuth= import.meta.env.PROD ? noAuth.includes(to.name) :true
  //白名单直接过
  if(isNoAuth){
    next()
  }else{
    //token存在
    if(token.value){
      // 走页面鉴权
      checkPagePermissions(next,to)
    }else{
      //token不存在
      //app环境走登陆页
      if (notDingTalk) {
        //非钉钉环境跳转登陆页
        router.replace({name:'login'})
      }else{
        //钉钉走钉钉鉴权
        sesstionStorage.set("beforePath", to.fullPath)
        let [ err ] = await To(auth());
        if(err){
          next({ name: '404',query:{title:err,description:err} })
        }else{
          checkPagePermissions(next,to)
        }
      }
    }
  }
})

export const checkPagePermissions = (next,to) => {
  const {pagePermissions=[]} = storeToRefs(useUserStore())
  let hasAuth = pagePermissions.value?.some((item) => {
    const matchPath = to.matched.slice(-1)[0].path
    let pass = item.domain.includes(matchPath)
    /* 最后字符为/ */
    if (!pass && matchPath.slice(-1)[0] === '/') {
      const newPath = matchPath.substr(0, matchPath.length - 1);
      pass = item.domain.includes(newPath)
    }
    return pass
  })
  // to.name=="demo" 可以删掉，测试demo用
  if(hasAuth || to.name=="demo"){
    next()
  }else{
    next({ name: '404',query:{title:"暂无权限",description:"暂无权限"} })
  }
}

export default router
