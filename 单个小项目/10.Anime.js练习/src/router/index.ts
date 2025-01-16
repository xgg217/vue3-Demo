import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Layout from "@/layout/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/demo",
      name: "Demo",
      component: Layout,
      redirect: "/demo/index",
      children: [
        {
          path: "index",
          name: "DemoIndex",
          component: () => import("@/views/Demo/index.vue"),
          meta: {
            title: "占位图",
            imgSrc: "",
          },
        },
      ],
    },
  ],
});

export default router;
