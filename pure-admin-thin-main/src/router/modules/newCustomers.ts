const Layout = () => import("@/layout/index.vue");

export default {
  path: "/newCustomers",
  name: "newCustomers",
  component: Layout,
  meta: {
    title: "客户列表"
  },
  children: [
    {
      path: "/newCustomers/index",
      name: "newCustomers",
      component: () => import("@/views/newCustomers/index.vue"),
      meta: {
        title: "我的客户"
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
    },
    {
      path: "/newCustomers/MeetingAppointment",
      name: "MeetingAppointment",
      component: () => import("@/views/newCustomers/DingDingMeeting.vue"),
      meta: {
        title: "钉钉会议预约",
        showLink: false
      }
    }
  ]
};