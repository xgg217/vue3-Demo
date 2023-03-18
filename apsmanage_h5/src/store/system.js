/**
 * 使用demo
 * // import { useUserStore } from '@/store/user'
 * // const userStore = useUserStore()
 * // userStore.updateName('李四')
 */

import {defineStore} from 'pinia'
import {useDictStore} from "@/store/dict";
export const useSystemStore = defineStore('system', {
  state: () => {
    return {
      env: '',//app、dd、h5
      browserEnv: '', //ios android pc
      version: '0', //app版本
      versionCode:'0'
    }
  },
  actions: {
    updateSystemStore(info) {
      Object.keys(info || {}).forEach((key) => {
        this[key] = info[key]
      })
    },
  },
  getters:{
    isApp:(state)=>{
      return state.env==='app'
    },
    isDd:(state)=>{
      return state.env==='dd'
    },
    isH5:(state)=>{
      return state.env==='h5'
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true, // 只有修改了的才会做持久化缓存
    strategies: [{
      storage:localStorage,
    }]
  }
})

