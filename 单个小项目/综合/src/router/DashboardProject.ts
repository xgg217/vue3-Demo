import type { RouteRecordRaw } from "vue-router";
import DashboardProjectLayout from "@/views/DashboardProject/layout/index.vue";

const animejs: RouteRecordRaw = {
  path: "/DashboardProject",
  name: "DashboardProject",
  component: DashboardProjectLayout,
  meta: {
    title: "大屏展示",
  },
  redirect: "/DashboardProject/index",
  children: [
    {
      path: "index",
      name: "DashboardProjectIndex",
      component: () => import("@/views/DashboardProject/index.vue"),
      meta: {
        title: "占位图",
        imgSrc: "",
      },
    },
    {
      path: "VwAndVh",
      name: "DashboardProjectVwAndVh",
      component: () => import("@/views/DashboardProject/VwAndVh.vue"),
      meta: {
        title: "vw / vh 适配",
      },
    },
    {
      path: "RemAndVwAndVh",
      name: "DashboardProjectRemAndVwAndVh",
      component: () => import("@/views/DashboardProject/RemAndVwAndVh.vue"),
      meta: {
        title: "rem + vw/vh 纯CSS处理",
      },
    },
    {
      path: "Scale",
      name: "DashboardProjectScale",
      component: () => import("@/views/DashboardProject/Scale.vue"),
      meta: {
        title: "Scale",
      },
    },
  ],
};

export default animejs;
