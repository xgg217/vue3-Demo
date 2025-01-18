import type { RouteRecordRaw } from "vue-router";
import AnimejsLayout from "@/views/animejs/layout/index.vue";

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
      component: () => import("@/views/animejs/index.vue"),
      meta: {
        title: "占位图",
        imgSrc: "",
      },
    },
    {
      path: "movingLetters",
      name: "MovingLetters",
      component: () => import("@/views/animejs/MovingLetters/index.vue"),
      meta: {
        title: "移动的字母",
        imgSrc: "MovingLetters/MovingLetters.gif",
      },
    },
    {
      path: "circularMotion",
      name: "CircularMotion",
      component: () => import("@/views/animejs/CircularMotion/index.vue"),
      meta: {
        title: "圆周运动",
        imgSrc: "",
      },
    },
  ],
};

export default animejs;
