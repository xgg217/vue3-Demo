import { defineStore } from 'pinia'

// 第一个参数是应用程序中 store 的唯一 id
export const useUsersStore = defineStore('users', {
  // 其它配置项
  state: () => {
    return {
      age: 1,
      name: 'John',
      sex: '男'
    }
  },

  getters: {
    getAddAge: (state) => {
      // return state.age + 100
      return (num: number) => state.age + num;
    },

    getNameAndAge(): string {
      return this.name + this.getAddAge; // 调用其它getter
    },
  },

  actions: {
    saveName(name: string) {
      // this指向的是当前store
      this.name = name;
    },
  }
})


