<template>
  <div>
    <h1>Edit Service</h1>
    <p>{{ errorMutation }}</p>
    <p v-if="errorMutation">{{ errorMutation }}</p>
    <form @submit.prevent="">
      <label for="">details: </label>
      <input type="text" v-model="details" />

      <label for="">storeDetails: </label>
      <input type="text" v-model="storeDetails" />

      <label for="">addOn: </label>
      <input type="text" v-model="addOn" />

      <label for="">price: </label>
      <input type="number" v-model="price" />

      <label for="">Image: </label>
      <!-- <input type="file" @change="onAddFile" /> -->
      <button @click="openUploadModal()"></button>

      <button @click="updateService()">Create service</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import {
  UPDATE_SERVICE,
  GET_ALL_SERVICES_AND_CATEGORIES,
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
          query: GET_ALL_SERVICES_AND_CATEGORIES,
        },
      ],
    }));

    onError((e) => {
      console.log(e);
      errorMutation.value = "Error updating service";
    });

    onDone((result) => {
      console.log("ondone " + result);
      router.push({
        name: "service",
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

<style lang="scss" scoped></style>
