// import HomeView from "../views/HomeView.vue";
import ButtonIndex from "@/views/button/ButtonIndex.vue";

const routes = [
  {
    path: "/",
    name: "button",
    component: ButtonIndex,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (About.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import("../views/AboutView.vue"),
  // },
];
export default routes;
