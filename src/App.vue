<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <span v-if="!user.role">
      | <router-link to="/login">Login</router-link> |
      <router-link to="/signup">Signup</router-link>
    </span>

    <span v-if="user.role">
      | <router-link to="/service">Service</router-link>
      <span v-if="user.role == 'admin'">
        |
        <router-link to="/service-category-create"
          >Service Category Create</router-link
        >
      </span>

      | <a href="" @click="logoutUser()">Logout</a>
    </span>

    <p>Role: {{ user.role }}</p>
    <p>Token: {{ user.token }}</p>
  </nav>
  <router-view :key="$route.fullPath" />
</template>

<script>
import { mapState } from "vuex";
import { LOGOUT_USER } from "./graphql-operations";
import { useMutation } from "@vue/apollo-composable";
import store from "@/store";
import router from "@/router";

export default {
  setup() {
    const { mutate: logoutUser, onDone } = useMutation(LOGOUT_USER);

    onDone((result) => {
      store.dispatch("clearUser");
      router.push({
        name: "home",
      });
    });

    return {
      logoutUser,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
