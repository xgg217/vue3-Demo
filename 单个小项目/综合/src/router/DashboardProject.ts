import type { RouteRecordRaw } from "vue-router";
import DashboardProjectLayout from "@/views/DashboardProject/layout/index.vue";

const animejs: RouteRecordRaw = {
  path: "/DashboardProject",
  name: "DashboardProject",
  component: DashboardProjectLayout,
  meta: {
    title: "DashboardProject",
  },
  redirect: "/DashboardProject/index",
  children: [
    {
      path: "index",
      name: "EChartsIndex",
      component: () => import("@/views/DashboardProject/index.vue"),
      meta: {
        title: "占位图",
        imgSrc: "",
      },
    },
  ],
};

export default animejs;
