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
  ],
};

export default animejs;
