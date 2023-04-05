<template>
  <div>
    <h1>Edit Service Category</h1>
    <p>{{ error }}</p>
    <p v-if="error">{{ error }}</p>
    <form @submit.prevent="">
      <label for="">Name: </label>
      <input type="text" v-model="name" />

      <label for="">Description: </label>
      <input type="text" v-model="description" />

      <label for="">Image: </label>
      <button @click="openUploadModal()"></button>

      <button @click="createCategory()">Edit service category</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import {
  UPDATE_SERVICE_CATEGORY,
  GET_ALL_SERVICE_CATEGORIES,
} from "../graphql-operations";
import router from "@/router";
import { useRoute } from "vue-router";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup() {
    const name = ref("");
    const description = ref("");
    const image = ref("");
    const error = ref("");
    const route = useRoute();

    const {
      mutate: createCategory,
      onDone,
      onError,
    } = useMutation(UPDATE_SERVICE_CATEGORY, () => ({
      variables: {
        id: route.params.id,
        name: name.value,
        description: description.value,
        image: image.value,
      },
      refetchQueries: [{ query: GET_ALL_SERVICE_CATEGORIES }],
    }));

    onError((e) => {
      error.value = "Error during updating service category";
    });

    onDone((result) => {
      router.push({
        name: "service",
      });
      name.value = "";
      description.value = "";
      image.value = "";
    });

    return {
      name,
      description,
      image,
      error,
      createCategory,
    };
  },
  methods: {
    openUploadModal() {
      window.cloudinary
        .openUploadWidget(
          { cloud_name: "dsc75sbwu", upload_preset: "d47ddnz9" },
          (error, result) => {
            if (!error && result && result.event === "success") {
              this.image = result.info.url;
            }
          }
        )
        .open();
    },
  },
};
</script>

<style lang="scss" scoped></style>
