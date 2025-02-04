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
      path: "targetAndAttribute",
      name: "TargetAndAttribute",
      component: () => import("@/views/animejs/TargetAndAttribute/index.vue"),
      meta: {
        title: "第一部分 目标与属性",
        imgSrc: "",
      },
    },
    {
      path: "animationAttribute",
      name: "AnimationAttribute",
      component: () => import("@/views/animejs/AnimationAttribute/index.vue"),
      meta: {
        title: "第一部分 动画属性",
        imgSrc: "",
      },
    },
    {
      path: "attributeParameter",
      name: "AttributeParameter",
      component: () => import("@/views/animejs/AttributeParameter/index.vue"),
      meta: {
        title: "第二部分 属性参数",
        imgSrc: "",
      },
    },
    {
      path: "custom",
      name: "Custom",
      component: () => import("@/views/animejs/Custom/index.vue"),
      meta: {
        title: "自定义",
        imgSrc: "",
      },
    },
  ],
};

export default animejs;
