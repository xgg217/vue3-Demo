import type { RouteRecordRaw } from "vue-router";
import AnimejsLayout from "@/views/Animejs/layout/index.vue";

const animejs: RouteRecordRaw = {
  path: "/animejs",
  name: "animejs",
  component: AnimejsLayout,
  meta: {
    title: "animejs动画",
  },
  redirect: "/animejs/index",
  children: [
    {
      path: "index",
      name: "AnimejsIndex",
      component: () => import("@/views/Animejs/index.vue"),
      meta: {
        title: "占位图",
        imgSrc: "",
      },
    },
  ],
};

export default animejs;
