import type { RouteRecordRaw } from "vue-router";
import AnimejsLayout from "@/views/Animejs/layout/index.vue";

const animejs: RouteRecordRaw = {
  path: "/animejs",
  name: "Animejs",
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
      path: "oneTargetAndAttribute",
      name: "OneTargetAndAttribute",
      component: () =>
        import("@/views/Animejs/OneTargetAndAttribute/index.vue"),
      meta: {
        title: "第一部分 目标与属性",
        imgSrc: "",
      },
    },
    {
      path: "oneAnimationAttribute",
      name: "oneAnimationAttribute",
      component: () =>
        import("@/views/Animejs/OneAnimationAttribute/index.vue"),
      meta: {
        title: "第一部分 动画属性",
        imgSrc: "",
      },
    },
    {
      path: "twoAttributeParameter",
      name: "twoAttributeParameter",
      component: () =>
        import("@/views/Animejs/TwoAttributeParameter/index.vue"),
      meta: {
        title: "第二部分 属性参数",
        imgSrc: "",
      },
    },
    {
      path: "twoParametersBasedOnFunctions",
      name: "TwoParametersBasedOnFunctions",
      component: () =>
        import("@/views/Animejs/TwoParametersBasedOnFunctions/index.vue"),
      meta: {
        title: "第二部分 基于函数的参数",
        imgSrc: "",
      },
    },
    {
      path: "three",
      name: "Three",
      component: () => import("@/views/Animejs/Three/index.vue"),
      meta: {
        title: "第三部分 值、时间轴和播放",
        imgSrc: "",
      },
    },
    {
      path: "custom",
      name: "Custom",
      component: () => import("@/views/Animejs/Custom/index.vue"),
      meta: {
        title: "自定义",
        imgSrc: "",
      },
    },
  ],
};

export default animejs;
