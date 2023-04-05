import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import ServiceView from "../views/ServiceView.vue";
import ServiceCategoryCreate from "@/views/ServiceCategoryCreate.vue";
import ServiceCreate from "@/views/ServiceCreate.vue";
import ServiceCategoryEdit from "@/views/ServiceCategoryEdit.vue";
import ServiceEdit from "@/views/ServiceEdit.vue";
import DateCreate from "@/views/DateCreate.vue";
import TimeslotCreate from "@/views/TimeslotCreate.vue";
import TimeslotUpdate from "@/views/TimeslotUpdate.vue";
import ServicesList from "@/views/ServicesList.vue";
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
  },
  {
    path: "/services-list",
    name: "services-list",
    component: ServicesList,
  },
  {
    path: "/service-edit/:id/:category_id",
    name: "service-edit",
    component: ServiceEdit,
    props: true,
  },
  {
    path: "/date-create/:id",
    name: "date-create",
    component: DateCreate,
    props: true,
  },
  {
    path: "/timeslot-create/:id",
    name: "timeslot-create",
    component: TimeslotCreate,
    props: true,
  },
  {
    path: "/timeslot-update/:id",
    name: "timeslot-update",
    component: TimeslotUpdate,
    props: true,
  },
  {
    path: "/service-category-create",
    name: "service-category-create",
    component: ServiceCategoryCreate,
    beforeEnter(routeTo, routeFrom, next) {
      if (store.state.user.role == "admin") {
        next();
      } else {
        next({ name: "home" });
      }
    },
  },
  {
    path: "/service-create/:category_id",
    name: "service-create",
    component: ServiceCreate,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      if (store.state.user.role == "admin") {
        next();
      } else {
        next({ name: "home" });
      }
    },
  },
  {
    path: "/service-category-edit/:id",
    name: "service-category-edit",
    component: ServiceCategoryEdit,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      console.log(routeTo.params);
      if (store.state.user.role == "admin") {
        next();
      } else {
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
