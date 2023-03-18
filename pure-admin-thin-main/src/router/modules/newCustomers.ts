export default {
  path: "/newCustomers",
  meta: {
    title: "新客户"
  },
  children: [
    {
      path: "/newCustomers/index",
      name: "newCustomers",
      component: () => import("@/views/newCustomers/index.vue"),
      meta: {
        title: "客户列表"
      }
    },
    {
      path: "/newCustomers/addCustomers",
      name: "addCustomers",
      component: () => import("@/views/newCustomers/addCustomers/index.vue"),
      meta: {
        title: "新增客户",
        showLink: false
      }
    }
  ]
};