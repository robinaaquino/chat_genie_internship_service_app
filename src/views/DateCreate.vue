<template>
  <div>
    <h1>Adding a Date</h1>
    <p>{{ errorMutation }}</p>
    <p v-if="errorMutation">{{ errorMutation }}</p>
    <form @submit.prevent="">
      <label for="">Date: </label>
      <input type="date" v-model="date" />

      <button @click="createDate()">Add date</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { CREATE_DATE, GET_ALL } from "../graphql-operations";
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
    const date = ref("");
    const errorMutation = ref("");
    const route = useRoute();

    const {
      mutate: createDate,
      onDone,
      onError,
    } = useMutation(CREATE_DATE, () => ({
      variables: {
        date: date.value,
        serviceId: route.params.id,
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
      date.value = "";
    });

    return {
      date,
      errorMutation,
      createDate,
    };
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
