/**
 * 使用demo
 * // import { useUserStore } from '@/store/user'
 * // const userStore = useUserStore()
 * // userStore.updateName('李四')
 */

import {defineStore} from 'pinia'
import {notDingTalk} from "@/utils/ddApi";
import {useDictStore} from "@/store/dict";
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      //页面权限-树状结构-工作台用到了
      permissions:[],
      //页面权限，打平的数组对象，做页面切换鉴权
      pagePermissions:[],
      accountId: "",
      accountPassword: "",
      accountStatus: 1,
      createDate: "",
      email: "",
      saasId: 0, //sass用户id
      isDelete: 0,
      leader: false,
      nickName: "",
      openId: "",
      phone: "",
      stateCode: "",
      token: "",
      unionId: "",
      updateDate: "",
      userId: "", //钉钉用户id
      userSource: 1,
      loginTime:"",
      roles:[],
      //组织
      orgDescribe: [],
      orgName: '', //最上层的部门名称
    }
  },
  actions: {
    updateUserInfo(info) {
      Object.keys(info || {}).forEach((key) => {
        this[key] = info[key]
      })
    },
    async asyncUpdateUserInfo(info){
      return new Promise((res,rej)=>{
        Object.keys(info || {}).forEach((key) => {
          this[key] = info[key]
        })
        res()
      })
    },
    updateAccessToken(value) {
      this.token = value
    }
  },
  getters:{
    //当前用户所在的部门，是个数组，可能在多个部门
    currentOrg:(state)=>{
      let {flatOrgTree}=storeToRefs(useDictStore())
      return flatOrgTree.value.filter((item)=>item.id===state.saasId).map(item=>item.parentId)
    },
    //是否是业务角色
    isBusiness:(state)=>{
      let ret=state.roles.filter((item)=>{
        return item.roleName==='业务'
      })
      return !!ret.length
    },
    //是否是IPQC角色
      isIPQC:(state)=>{
      let ret=state.roles.filter((item)=>{
        return item.roleName==='IPQC'
      })
      return !!ret.length
    },

  },
  // 开启数据缓存
  persist: {
    enabled: true, // 只有修改了的才会做持久化缓存
    strategies: [{
      //钉钉环境，每次从小6进去都发起登陆请求，非钉钉环境 token持久化存储
      //为什么要这么做？ 获取用户权限是在用户登陆的时候做的，app可以重新登陆获取新的权限，但是钉钉没得重新登陆，
      storage:notDingTalk?localStorage:sessionStorage,
    }]
  }
})

