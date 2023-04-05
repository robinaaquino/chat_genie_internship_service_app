<template>
  <div>
    <h1>Create Service</h1>
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

      <button @click="createService()">Create service</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { CREATE_SERVICE, GET_ALL } from "../graphql-operations";
import router from "@/router";
import { useRoute } from "vue-router";

export default {
  props: {
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

    const {
      mutate: createService,
      onDone,
      onError,
    } = useMutation(CREATE_SERVICE, () => ({
      variables: {
        details: details.value,
        storeDetails: storeDetails.value,
        image: image.value,
        price: price.value,
        addOn: addOn.value,
        serviceCategoryId: route.params.category_id,
      },
      refetchQueries: [{ query: GET_ALL }],
    }));

    onError((e) => {
      console.log(e);
      errorMutation.value = "Error during service creation";
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
      createService,
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
