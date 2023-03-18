// vue3新的状态管理工具 https://juejin.cn/post/7049196967770980389#heading-3
// 中文文档 https://pinia.web3doc.top/
// 英文文档https://pinia.web3doc.top/

import { createPinia } from 'pinia'
import pinaPluginPersist from 'pinia-plugin-persist' // 持久化store

import { useDictStore } from './dict'
import { useBusinessStore } from './business'
import { useUserStore } from './user'
import { useNavBarStore } from './nav'
import { useSystemStore } from './system'
const store = createPinia()
store?.use(pinaPluginPersist)

export { useBusinessStore, useUserStore,useDictStore,useNavBarStore,useSystemStore}

export default store

