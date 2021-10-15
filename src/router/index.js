import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
// import Switch from "../views/Switch.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
      path: "/switch",
      name: "Switch",
      component: () => import(/* webpackChunkName: "about" */ '../views/Switch.vue')

    //Add fallback route
  }


];


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    // Add functionert das ? process.env.BASE_URL
    routes
  })
  
  export default router

