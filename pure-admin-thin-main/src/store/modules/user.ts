import { defineStore } from "pinia";
import { store } from "@/store";
import { verificationCodeLogin } from '@/api/login'

const TOKEN = 'token'

// import { userType } from "./types";
// import { routerArrays } from "@/layout/types";
// import { router, resetRouter } from "@/router";
// import { storageSession } from "@pureadmin/utils";
// import { getLogin, refreshTokenApi } from "@/api/user";
// import { UserResult, RefreshTokenResult } from "@/api/user";
// import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
// import { type DataInfo, setToken, removeToken, sessionKey } from "@/utils/auth";

type IRoles = {
  id: string;
  roleSource: number; // 角色来源
  roleName: string; // 角色名称
  refId: string; // 角色id
  groupId: string; // 组id
  groupName: string; // 组名称
  isDelete: boolean; // 是否删除
}
export type IUser = {
  // username: string; // 用户名
  // password: string; // 密码
  // salt: string;
  nickName: string; // 昵称
  accountId: string; // 账号id
  accountPassword: string; // 账号id
  phone: string; // 手机号
  stateCode: string; // 状态码
  email: string; // 邮箱
  userSource: number; // 用户来源
  openId: string; // 微信openId
  unionId: string; // 微信unionId
  userId: string; // 钉钉用户id
  saasId: string; // sass用户id
  isDelete: boolean; // 是否删除
  leader: boolean; // 是否是领导
  createDate: string; // 创建时间
  updateDate: string; // 更新时间
  accountStatus: number; // 账号状态
  token: string; // token
  roles: IRoles[]
}

interface IState extends IUser {
  permissions: any[];
  pagePermissions: any[];
  loginTime: number; // 登录时间
  orgDescribe: any[];
  orgName: string;
}

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): IState => {
    return {
      //页面权限-树状结构-工作台用到了
      permissions: [],
      //页面权限，打平的数组对象，做页面切换鉴权
      pagePermissions: [],
      accountId: "",
      accountPassword: "",
      accountStatus: 1,
      createDate: "",
      email: "",
      saasId: '', //sass用户id
      isDelete: false,
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
      loginTime: 0, // 登录时间
      roles: [],
      //组织
      orgDescribe: [],
      orgName: '', //最上层的部门名称
    }
  },
  actions: {
    // updateUserInfo(info) {
    //   Object.keys(info || {}).forEach((key) => {
    //     this[key] = info[key]
    //   })
    // },
    // async asyncUpdateUserInfo(info) {
    //   return new Promise((res, rej) => {
    //     Object.keys(info || {}).forEach((key) => {
    //       this[key] = info[key]
    //     })
    //     res()
    //   })
    // },
    // updateAccessToken(value) {
    //   this.token = value
    // }

    // 登陆-获取用户信息
    codeLogin(phone: string, code: string) {
      return verificationCodeLogin(phone, code).then(res => {
        console.log(res);
        if (!res.success) return Promise.reject(res.msg)
        const { data } = res

        this.nickName = data.nickName
        this.accountId = data.accountId
        this.accountPassword = data.accountPassword
        this.phone = data.phone
        this.stateCode = data.stateCode
        this.email = data.email
        this.userSource = data.userSource
        this.openId = data.openId
        this.unionId = data.unionId
        this.userId = data.userId
        this.saasId = data.saasId
        this.isDelete = data.isDelete
        this.leader = data.leader
        this.createDate = data.createDate
        this.updateDate = data.updateDate
        this.accountStatus = data.accountStatus
        this.token = data.token
        this.roles = data.roles
        this.loginTime = Date.now()

        localStorage.setItem(TOKEN, data.token)



        return Promise.resolve(true)
      }).catch(err => {
        console.error(err);
        return Promise.reject(err)
      })
    }
  },

  getters: {
    //当前用户所在的部门，是个数组，可能在多个部门
    currentOrg: (state) => {
      // let { flatOrgTree } = storeToRefs(useDictStore())
      // return flatOrgTree.value.filter((item) => item.id === state.saasId).map(item => item.parentId)
    },
    //是否是业务角色
    isBusiness: (state) => {
      // let ret = state.roles.filter((item) => {
      //   return item.roleName === '业务'
      // })
      // return !!ret.length
    },
    //是否是IPQC角色
    isIPQC: (state) => {
      // let ret = state.roles.filter((item) => {
      //   return item.roleName === 'IPQC'
      // })
      // return !!ret.length
    },

  },


});

export function useUserStoreHook() {
  return useUserStore(store);
}
