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
    {
      path: "movingLetters",
      name: "MovingLetters",
      component: () => import("@/views/Animejs/MovingLetters/index.vue"),
      meta: {
        title: "移动的字母",
        imgSrc: "MovingLetters/MovingLetters.gif",
      },
    },
    {
      path: "targetAndAttribute",
      name: "TargetAndAttribute",
      component: () => import("@/views/Animejs/TargetAndAttribute/index.vue"),
      meta: {
        title: "第一部分 目标与属性",
        imgSrc: "",
      },
    },
    {
      path: "animationAttribute",
      name: "AnimationAttribute",
      component: () => import("@/views/Animejs/AnimationAttribute/index.vue"),
      meta: {
        title: "第一部分 动画属性",
        imgSrc: "",
      },
    },
    {
      path: "circularMotion",
      name: "CircularMotion",
      component: () => import("@/views/Animejs/CircularMotion/index.vue"),
      meta: {
        title: "圆周运动",
        imgSrc: "",
      },
    },
  ],
};

export default animejs;
