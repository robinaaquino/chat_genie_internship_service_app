<template>
  <div>
    <p>test</p>
    <p v-if="error">Something went wrong...</p>
    <p v-if="loading">Loading...</p>
    <div v-else v-for="user in result.allUsers" :key="user.id">
      <p>Id: {{ user.id }}</p>
      <p>Username: {{ user.username }}</p>
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
