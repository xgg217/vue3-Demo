import { defineStore } from "pinia";
// import { USER_LIST } from "../server/consts";

export const useUserStore = defineStore("useUserStore", {
  // 定义数据状态
  state: () => {
    return {
      userList: [],
    };
  },
});
