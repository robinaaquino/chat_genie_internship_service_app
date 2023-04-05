<template>
  <h1>List of All Services</h1>
  <div v-if="loading">Loading...</div>
  <div v-else v-for="service in result.allServices" :key="service.id">
    <h2>Details: {{ service.details }}</h2>
    <h2>Store Details: {{ service.storeDetails }}</h2>
    <h2>Price: {{ service.price }}</h2>
    <img :src="service.image" alt="" height="150" width="150" />
    <div
      v-if="
        result.allDates.filter((e) => e.serviceId == service.id).length > 0 &&
        result.allTimeslots.filter((e) => e.serviceId == service.id).length > 0
      "
    >
      <div
        v-if="
          result.allDates.filter((e) => e.serviceId == service.id).length > 0
        "
      >
        <h1>Dates:</h1>
      </div>
      <div v-for="date in result.allDates" :key="date.id">
        <h2>Date: {{ date.date }}</h2>
      </div>
      <div
        v-if="
          result.allTimeslots.filter((e) => e.serviceId == service.id).length >
          0
        "
      >
        <h1>Timeslots:</h1>
        <div v-for="timeslot in result.allTimeslots" :key="timeslot.id">
          <h2>Timeslot: {{ timeslot.time }}</h2>
          <h2>Slots: {{ timeslot.slots }}</h2>
        </div>
      </div>
      <button>Add to cart</button>
    </div>
    <div v-else><button>Unavailable</button></div>
  </div>
</template>

<script>
import { ALL_SERVICES_DATES_AND_TIMESLOTS } from "../graphql-operations";
import { useQuery } from "@vue/apollo-composable";

export default {
  setup() {
    const { result, loading, error } = useQuery(
      ALL_SERVICES_DATES_AND_TIMESLOTS,
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
};
</script>

<style lang="scss" scoped></style>
