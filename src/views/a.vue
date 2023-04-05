<template>
  <div>
    <h1>List of Services</h1>
    <p v-if="loading">Loading</p>
    <p v-if="error"></p>
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
        {{ serviceCategory.id === service.serviceCategoryId }}
        <div v-if="serviceCategory.id === service.serviceCategoryId">
          <router-link
            :to="{
              name: 'service-edit',
              params: { id: service.id, category_id: serviceCategory.id },
            }"
            >Service Details: {{ service.details }}
          </router-link>
          <p>Store Details: {{ service.storeDetails }}</p>
          <p>Add On: {{ service.addOn }}</p>
          <p>Price: {{ service.price }}</p>
          <img :src="service.image" alt="" height="150" width="150" />
          <div v-for="dates in result.allDates" :key="dates.id">
            <div v-if="service.id === dates.serviceId">
              <p>{{ dates.date }}</p>
            </div>
          </div>

          <div v-for="timeslots in result.allTimeslots" :key="timeslots.id">
            <div v-if="service.id === timeslots.serviceId">
              <p>Timeslot: {{ timeslots.time }}</p>
              <p>Slots: {{ timeslots.slots }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_ALL } from "../graphql-operations";
import { useQuery } from "@vue/apollo-composable";
import { mapState } from "vuex";

export default {
  setup() {
    const { result, loading, error } = useQuery(GET_ALL, {
      fetchPolicy: "network-only",
    });

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
