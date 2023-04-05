<template>
  <div>
    <h1>Edit Service</h1>
    <p>{{ errorMutation }}</p>
    <p v-if="errorMutation">{{ errorMutation }}</p>
    <form @submit.prevent="">
      <label for="">Details: </label>
      <input type="text" v-model="details" />

      <label for="">Store Details: </label>
      <input type="text" v-model="storeDetails" />

      <label for="">Add on: </label>
      <input type="text" v-model="addOn" />

      <label for="">Price: </label>
      <input type="number" v-model="price" />

      <p v-if="loading">Loading...</p>
      <p v-if="error">{{ error }}</p>
      <div v-else>
        <h3 for="">Dates</h3>
        <router-link
          :to="{
            name: 'date-create',
            params: {
              id: id,
            },
          }"
          >Add date
        </router-link>
        <div v-if="result.allDates.filter((e) => e.serviceId == id).length > 0">
          <div
            v-for="date in result.allDates.filter((e) => e.serviceId == id)"
            :key="date.id"
          >
            Date: {{ date.date }}
          </div>
        </div>
        <div v-else>
          <p>No dates</p>
        </div>

        <h3 for="">Timeslots</h3>
        <router-link
          :to="{
            name: 'timeslot-create',
            params: {
              id: id,
            },
          }"
          >Add timeslot
        </router-link>
        <div
          v-if="result.allTimeslots.filter((e) => e.serviceId == id).length > 0"
        >
          <div
            v-for="timeslot in result.allTimeslots.filter(
              (e) => e.serviceId == id
            )"
            :key="timeslot.id"
          >
            <p>Time: {{ timeslot.time }}</p>
            <p>Slots: {{ timeslot.slots }}</p>
            <router-link
              :to="{
                name: 'timeslot-update',
                params: {
                  id: id,
                },
              }"
              >Edit slots
            </router-link>
            <br />
          </div>
        </div>
        <div v-else>
          <p>No timeslots</p>
        </div>
      </div>

      <button @click="openUploadModal()">Upload image</button>

      <button @click="updateService()">Edit service</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import {
  UPDATE_SERVICE,
  GET_ALL,
  ALL_DATES_AND_TIMESLOTS,
} from "../graphql-operations";
import router from "@/router";
import { useRoute } from "vue-router";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    category_id: {
      type: String,
      required: true,
    },
  },
  setup() {
    const details = ref("");
    const storeDetails = ref("");
    const image = ref("");
    const price = ref("");
    const addOn = ref("");
    const errorMutation = ref("");
    const route = useRoute();

    console.log(route.params);
    const id = route.params.id;
    console.log("id " + route.params.id);

    const {
      mutate: updateService,
      onDone,
      onError,
    } = useMutation(UPDATE_SERVICE, () => ({
      variables: {
        id: route.params.id,
        details: details.value,
        storeDetails: storeDetails.value,
        image: image.value,
        price: price.value,
        addOn: addOn.value,
        serviceCategoryId: route.params.category_id,
      },
      refetchQueries: [
        {
          query: GET_ALL,
        },
      ],
    }));

    const { result, loading, error } = useQuery(ALL_DATES_AND_TIMESLOTS, {
      fetchPolicy: "network-only",
    });

    onError((e) => {
      console.log(e);
      errorMutation.value = "Error updating service";
    });

    onDone((result) => {
      console.log("ondone " + result);
      router.push({
        name: "home",
      });
      details.value = "";
      storeDetails.value = "";
      image.value = "";
      addOn.value = "";
      price.value = 0;
    });

    return {
      details,
      storeDetails,
      image,
      addOn,
      price,
      errorMutation,
      updateService,
      result,
      loading,
      error,
    };
  },
  methods: {
    openUploadModal() {
      window.cloudinary.openUploadWidget(
        { cloud_name: "dsc75sbwu", upload_preset: "d47ddnz9" },
        (error, result) => {
          if (!error && result && result.event === "success") {
            this.image = result.info.url;
          }
        }
      );
    },
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
