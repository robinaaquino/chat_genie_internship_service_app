<template>
  <div>
    <h1>List of Services</h1>
    <div
      v-for="serviceCategory in result.allServiceCategories"
      :key="serviceCategory.id"
    >
      <h1>Service Category: {{ serviceCategory.name }}</h1>
      <span v-if="user.role === 'admin'">
        <router-link
          :to="{
            name: 'service-category-edit',
            params: { id: serviceCategory.id },
          }"
          >Edit category
        </router-link>
        |
        <router-link
          :to="{
            name: 'service-create',
            params: { id: serviceCategory.id },
          }"
          >Add service
        </router-link></span
      >

      <h2>Description: {{ serviceCategory.description }}</h2>
      <img :src="serviceCategory.image" alt="" height="150" width="150" />
      <h2>Services:</h2>
      <div v-for="service in result.allServices" :key="service.id">
        <router-link
          :to="{
            name: 'service-show',
            params: { id: service.id, category_id: serviceCategory.id },
          }"
          >Service Details: {{ service.details }}
        </router-link>
        <p>Store Details: {{ service.storeDetails }}</p>
        <p>Add On: {{ service.addOn }}</p>
        <p>Price: {{ service.price }}</p>
        <img :src="service.image" alt="" height="150" width="150" />
      </div>
    </div>
  </div>
</template>

<script>
import { GET_ALL_SERVICES_AND_CATEGORIES } from "../graphql-operations";
import { useQuery } from "@vue/apollo-composable";
import { mapState } from "vuex";

export default {
  setup() {
    const { result, loading, error } = useQuery(
      GET_ALL_SERVICES_AND_CATEGORIES,
      {
        fetchPolicy: "network-only",
      }
    );

    return {
      result,
      loading,
      error,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="scss" scoped></style>
