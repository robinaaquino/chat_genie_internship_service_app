<template>
  <div>
    <h1>List of Services</h1>
    <div
      v-for="serviceCategory in result.allServiceCategories"
      :key="serviceCategory.id"
    >
      <h1>Service Category: {{ serviceCategory.name }}</h1>
      <h2>Description: {{ serviceCategory.description }}</h2>
      <img :src="serviceCategory.image" alt="" height="150" width="150" />
    </div>
  </div>
</template>

<script>
import { GET_ALL_SERVICE_CATEGORIES } from "../graphql-operations";
import { useQuery } from "@vue/apollo-composable";

export default {
  setup() {
    const { result, loading, error } = useQuery(GET_ALL_SERVICE_CATEGORIES, {
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
