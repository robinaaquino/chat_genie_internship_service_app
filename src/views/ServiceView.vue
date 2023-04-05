<template>
  <div>
    <span>
      <router-link to="/service-category-create"
        >Create a service category</router-link
      >
    </span>

    <div v-if="result.allServiceCategories.length > 0">
      <h1>Service Categories</h1>

      <div
        v-for="serviceCategory in result.allServiceCategories"
        :key="serviceCategory.id"
        class="card left"
      >
        <span>
          <h2>Name: {{ serviceCategory.name }}</h2>
          <router-link
            :to="{
              name: 'service-category-edit',
              params: { id: serviceCategory.id },
            }"
            >Edit category
          </router-link>
        </span>

        <h2>Description: {{ serviceCategory.description }}</h2>
        <img
          :src="serviceCategory.image"
          alt="Image"
          height="150"
          width="150"
        />

        <div
          v-if="
            result.allServices.filter(
              (e) => e.serviceCategoryId == serviceCategory.id
            ).length > 0
          "
        >
          <h1>Services:</h1>
          |
          <router-link
            :to="{
              name: 'service-create',
              params: {
                category_id: serviceCategory.id,
              },
            }"
            >Add new service
          </router-link>
          <div
            v-for="service in result.allServices.filter(
              (e) => e.serviceCategoryId == serviceCategory.id
            )"
            :key="service.id"
          >
            <div v-if="service.serviceCategoryId == serviceCategory.id">
              <span>
                <h2>Service details: {{ service.details }}</h2>
                <router-link
                  :to="{
                    name: 'service-edit',
                    params: {
                      id: service.id,
                      category_id: service.serviceCategoryId,
                    },
                  }"
                  >Edit service
                </router-link>
              </span>

              <h2>Store details: {{ service.storeDetails }}</h2>
              <h2>Price: {{ service.price }}</h2>
              <img :src="service.image" alt="Image" height="150" width="150" />

              <div
                v-if="
                  result.allDates.filter((e) => e.serviceId == service.id)
                    .length > 0
                "
              >
                <h1>Dates:</h1>
                <div v-for="date in result.allDates" :key="date.id">
                  <h2>Date: {{ date.date }}</h2>
                </div>
              </div>
              <div v-else><h1>No available dates</h1></div>
              <div
                v-if="
                  result.allTimeslots.filter((e) => e.serviceId == service.id)
                    .length > 0
                "
              >
                <h1>Timeslots:</h1>
                <div v-for="timeslot in result.allTimeslots" :key="timeslot.id">
                  <h2>Timeslot: {{ timeslot.time }}</h2>
                  <h2>Slots: {{ timeslot.slots }}</h2>
                </div>
              </div>
              <div v-else>No available timeslots</div>
            </div>
          </div>
        </div>
        <div v-else><h2>No services available for this category</h2></div>
        <br />
      </div>
    </div>
    <div v-else>
      <h1>No service categories</h1>
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

<style scoped>
.card {
  padding: 20px;
  margin-bottom: 24px;
  display: block;
  width: 100%;
}

.card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}

.left {
  float: left;
  text-align: left;
}

.right {
  float: right;
  text-align: right;
}
</style>
