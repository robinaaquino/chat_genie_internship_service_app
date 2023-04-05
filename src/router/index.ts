import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import ServiceView from "../views/ServiceView.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    beforeEnter() {
      console.log(store.state.user.token);
      if (store.state.user.token != "") {
        return false;
      }
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
    beforeEnter() {
      if (store.state.user.token != "") {
        return false;
      }
    },
  },
  {
    path: "/service",
    name: "service",
    component: ServiceView,
    beforeEnter(routeTo, routeFrom, next) {
      if (store.state.user.token == "") {
        next({ name: "home" });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
