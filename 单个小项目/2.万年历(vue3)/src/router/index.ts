import { createRouter, createWebHistory } from "vue-router";
import DayView from "@/views/DayView/IndexView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "day",
      component: DayView,
    },
    {
      path: "/month",
      name: "month",
      component: () => import("@/views/MonthView/MonthView.vue"),
    },
    {
      path: "/year",
      name: "year",
      component: () => import("@/views/YearView/YearView.vue"),
    },
  ],
});

export default router;
