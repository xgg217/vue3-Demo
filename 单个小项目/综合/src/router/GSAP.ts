import type { RouteRecordRaw } from "vue-router";
import GSAPLayout from "@/views/GSAP/layout/index.vue";

const animejs: RouteRecordRaw = {
  path: "/GSAP",
  name: "GSAP",
  component: GSAPLayout,
  meta: {
    title: "GSAP动画",
  },
  redirect: "/GSAP/index",
  children: [
    {
      path: "index",
      name: "GSAPIndex",
      component: () => import("@/views/GSAP/index.vue"),
      meta: {
        title: "占位图",
        imgSrc: "",
      },
    },
    {
      path: "apiDemo",
      name: "GSAPApiDemo",
      component: () => import("@/views/GSAP/ApiDemo/index.vue"),
      meta: {
        title: "api熟悉",
        imgSrc: "",
      },
    },
    {
      path: "timelineDemo",
      name: "GSAPTimelineDemo",
      component: () => import("@/views/GSAP/Timeline/index.vue"),
      meta: {
        title: "时间线",
        imgSrc: "",
      },
    },
    {
      path: "StaggerDemo",
      name: "GSAPStaggerDemo",
      component: () => import("@/views/GSAP/Stagger/index.vue"),
      meta: {
        title: "stagger 交错",
        imgSrc: "",
      },
    },
    {
      path: "GSDevTools",
      name: "GSDevTools",
      component: () => import("@/views/GSAP/RegisterPlugin/GSDevTools.vue"),
      meta: {
        title: "插件之GSDevTools",
        imgSrc: "",
      },
    },
    {
      path: "ScrollTrigger",
      name: "ScrollTrigger",
      component: () => import("@/views/GSAP/RegisterPlugin/ScrollTrigger.vue"),
      meta: {
        title: "插件之ScrollTrigger",
        imgSrc: "",
      },
    },
  ],
};

export default animejs;
