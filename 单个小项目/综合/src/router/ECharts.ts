import type { RouteRecordRaw } from "vue-router";
import EChartsLayout from "@/views/ECharts/layout/index.vue";

const animejs: RouteRecordRaw = {
  path: "/ECharts",
  name: "ECharts",
  component: EChartsLayout,
  meta: {
    title: "ECharts",
  },
  redirect: "/ECharts/index",
  children: [
    {
      path: "index",
      name: "EChartsIndex",
      component: () => import("@/views/ECharts/index.vue"),
      meta: {
        title: "占位图",
        imgSrc: "",
      },
    },
  ],
};

export default animejs;
