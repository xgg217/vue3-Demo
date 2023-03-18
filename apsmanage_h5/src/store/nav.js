import { defineStore } from 'pinia'

export const useNavBarStore = defineStore('navBar', {
  state: () => {
    return {
      title:'',
      showLeft:false,
      rightText:'',
      leftText:'',
    }
  },
  actions: {
    updateNavBar (info) {
      Object.keys(info || {}).forEach((key)=>{
        this[key]=info[key]
      })
    },
  },
  getters: {
  },
})
