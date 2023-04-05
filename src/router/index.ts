import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
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
import BookingList from "@/views/BookingList.vue";
import UsersListView from "@/views/UsersListView.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
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
    name: "service-admin",
    component: ServiceView,
  },
  {
    path: "/",
    name: "home",
    component: ServicesList,
  },
  {
    path: "/service-edit/:id/:category_id",
    name: "service-edit",
    component: ServiceEdit,
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
    path: "/users-list",
    name: "users-list",
    component: UsersListView,
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
    path: "/date-create/:id",
    name: "date-create",
    component: DateCreate,
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
    path: "/timeslot-create/:id",
    name: "timeslot-create",
    component: TimeslotCreate,
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
    path: "/timeslot-update/:id",
    name: "timeslot-update",
    component: TimeslotUpdate,
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
    path: "/booking-list",
    name: "booking-list",
    component: BookingList,
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
