import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import animejs from "./animejs";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    // Animejs 动画
    animejs,

    // 上班统计
    {
      path: "/onDutyStatistics",
      name: "OnDutyStatistics",
      component: () => import("@/views/onDutyStatistics/index.vue"),
      meta: {
        title: "上班统计",
      },
    },

    {
      path: "/404",
      component: () => import("@/views/404.vue"),
      meta: {
        title: "404",
      },
    },
  ],
});

export default router;
