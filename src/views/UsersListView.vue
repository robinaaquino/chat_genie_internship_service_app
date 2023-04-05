<template>
  <div>
    <h1>List of All Users</h1>
    <p v-if="error">Something went wrong...</p>
    <p v-if="loading">Loading...</p>
    <div v-else v-for="user in result.allUsers" :key="user.id">
      <p>Id: {{ user.id }}</p>
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <br />
    </div>
    <div></div>
  </div>
</template>

<script>
import { GET_ALL_USERS } from "../graphql-operations";
import { useQuery } from "@vue/apollo-composable";

export default {
  setup() {
    const { result, loading, error } = useQuery(GET_ALL_USERS, {
      fetchPolicy: "network-only",
    });
    return {
      result,
      loading,
      error,
    };
  },
};
</script>

<style lang="scss" scoped></style>
