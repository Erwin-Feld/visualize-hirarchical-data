import { createWebHistory, createRouter } from "vue-router";

import Home from "../view/Home.vue";
import Policy from "../view/PrivatePolicy.vue";
import PageNotFound from "../view/PageNotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/policy",
    name: "policy",
    component: Policy,
  },
  { path: "/:pathMatch(.*)*", component: PageNotFound }
];

const router = createRouter({
  history: createWebHistory(),

  routes,
});

export default router;


