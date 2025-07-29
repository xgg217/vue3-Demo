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
    {
      path: "setOption",
      name: "EChartsSetOption",
      component: () => import("@/views/ECharts/SetOption/index.vue"),
      meta: {
        title: "setOption 示例",
        imgSrc: "",
      },
    },
    {
      path: "setOptionAxis",
      name: "EChartsSetOptionAxis",
      component: () => import("@/views/ECharts/SetOptionAxis/index.vue"),
      meta: {
        title: "setOption 轴体",
        imgSrc: "",
      },
    },
    {
      path: "setOptionDataZoom",
      name: "SetOptionDataZoom",
      component: () => import("@/views/ECharts/SetOptionDataZoom/index.vue"),
      meta: {
        title: "DataZoom 区域缩放",
        imgSrc: "",
      },
    },
    {
      path: "setOptionTooltiop",
      name: "SetOptionTooltiop",
      component: () => import("@/views/ECharts/SetOptionTooltiop/index.vue"),
      meta: {
        title: "tooltiop 提示框",
        imgSrc: "",
      },
    },
  ],
};

export default animejs;
