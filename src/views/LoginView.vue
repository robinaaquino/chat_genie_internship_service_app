<template>
  <div>
    <h1>Login</h1>
    <p v-if="error">{{ error }}</p>
    <form @submit.prevent="">
      <label for="">Username: </label>
      <input type="text" v-model="username" />

      <label for="">Password: </label>
      <input type="text" v-model="password" />

      <button @click="loginUser()">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { SIGNIN_USER } from "../graphql-operations";
import { mapActions } from "vuex";
import store from "@/store";
import router from "@/router";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const error = ref("");

    const {
      mutate: loginUser,
      onDone,
      onError,
    } = useMutation(SIGNIN_USER, () => ({
      variables: {
        username: username.value,
        password: password.value,
      },
    }));

    onError((e) => {
      console.log(e);
      error.value = "Error during login";
    });

    onDone((result) => {
      console.log(result);
      store.dispatch("setUser", {
        token: result.data.signinUser.token,
        role: result.data.signinUser.user.role,
      });
      username.value = "";
      password.value = "";
      router.push({
        name: "home",
      });
    });

    return {
      username,
      password,
      error,
      loginUser,
    };
  },
  methods: {
    ...mapActions(["setUser"]),
  },
};
</script>

<style scoped>
form {
  width: 80%;
  margin: 0 auto;
}

input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}

label {
  padding: auto;
  margin: auto;
}

button {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
</style>
