<template>
  <div>
    <h1>Create User</h1>
    <p v-if="error">{{ error }}</p>
    <form @submit.prevent="">
      <label for="">Username: </label>
      <input type="text" v-model="username" />

      <label for="">Password: </label>
      <input type="text" v-model="password" />

      <button @click="createUser()">Sign up</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { CREATE_CUSTOMER_USER, GET_ALL_USERS } from "../graphql-operations";
import router from "@/router";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const error = ref("");

    const {
      mutate: createUser,
      onDone,
      onError,
    } = useMutation(CREATE_CUSTOMER_USER, () => ({
      variables: {
        username: username.value,
        password: password.value,
      },
      refetchQueries: [{ query: GET_ALL_USERS }],
    }));

    onError(() => {
      error.value = "Error during signup";
    });

    onDone((result) => {
      router.push({
        name: "login",
      });
      username.value = "";
      password.value = "";
    });

    return {
      username,
      password,
      error,
      createUser,
    };
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
