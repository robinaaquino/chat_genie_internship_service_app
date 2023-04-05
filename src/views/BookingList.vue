<template>
  <div>
    <h1>List of All Bookings</h1>
    <p v-if="error">Something went wrong...</p>
    <p v-if="loading">Loading...</p>
    <table>
      <tr>
        <th>Booking Number</th>
        <th>Booking Date</th>
        <th>Name of customer</th>
        <th>Service</th>
        <th>Date</th>
        <th>Time</th>
        <th>Amount</th>
        <th>Finish</th>
        <th>Cancel</th>
      </tr>
      <div v-for="booking in result.allBookings" :key="booking.id">
        <tr>
          <th>{{ booking.id }}</th>
          <th>{{ booking.date }}</th>
          <th>{{ booking.nameOfCustomer }}</th>
          <th>{{ booking.serviceId }}</th>
          <th>{{ booking.date }}</th>
          <th>{{ booking.time }}</th>
          <th>{{ booking.amount }}</th>
          <th><button>Finish</button></th>
          <th><button>Cancel</button></th>
        </tr>
        <br />
      </div>
    </table>

    <div></div>
  </div>
</template>

<script>
import { ALL_BOOKINGS, UPDATE_BOOKING } from "../graphql-operations";
import { useQuery } from "@vue/apollo-composable";

export default {
  setup() {
    const { result, loading, error } = useQuery(ALL_BOOKINGS, {
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
