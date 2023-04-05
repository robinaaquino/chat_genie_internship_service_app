<template>
  <h1>List of All Services</h1>
  <p>
    Cart ha{{ user.cart.length == 0 ? "s" : "ve" }}
    {{ user.cart.length }} service{{ user.cart.length <= 1 ? "" : "s" }}
  </p>
  <div v-if="user.cart.length > 0">
    <button v-if="this.step == 0" @click="incrementStep()">
      Proceed to checking out
    </button>
    <button v-else @click="resetStep()">Close form for checking out</button>
  </div>

  <div>
    <form @submit.prevent="">
      <div v-if="this.step == 1">
        <h1>Account Details</h1>
        <label for="">First Name: </label>
        <input type="text" v-model="firstName" />

        <label for="">Last Name: </label>
        <input type="text" v-model="lastName" />

        <label for="">Address: </label>
        <input type="text" v-model="address" />

        <label for="">Contact Number: </label>
        <input type="text" v-model="contactNumber" />

        <label for="">Email address: </label>
        <input type="text" v-model="emailAddress" />

        <h1>Complete Address</h1>
        <label for="">Street: </label>
        <input type="text" v-model="street" />

        <label for="">Baranggay: </label>
        <input type="text" v-model="baranggay" />

        <label for="">City: </label>
        <input type="text" v-model="city" />

        <label for="">Province: </label>
        <input type="text" v-model="province" />

        <label for="">Postal Code: </label>
        <input type="text" v-model="postalCode" />

        <button @click="incrementStep()">Next</button>
      </div>
      <div v-if="this.step == 2">
        <h1>Payment Method</h1>
        <input
          type="radio"
          name="payment"
          :value="bank"
          v-model="paymentMethod"
        />
        <label>Bank payment</label>
        <input
          type="radio"
          name="payment"
          :value="store"
          v-model="paymentMethod"
        />
        <label>Pay at the store</label>

        <button @click="incrementStep()">Next</button>
      </div>
      <div v-if="this.step == 3">
        <h1>Cart Services</h1>
        <div v-for="service in user.cart" :key="service.id">
          <p>Service Details: {{ service.details }}</p>
          <p>Store Details: {{ service.storeDetails }}</p>
          <p>Price: {{ service.price }}</p>
          <p>Date: {{ service.date.date }}</p>
          <p>Time: {{ service.time.time }}</p>
          <br />
        </div>

        <h1>Account Details</h1>
        <p>First Name: {{ this.firstName }}</p>
        <p>Last Name: {{ this.lastName }}</p>
        <p>Contact Number: {{ this.contactNumber }}</p>
        <p>Email Address: {{ this.emailAddress }}</p>

        <h1>Payment Method</h1>
        <p>
          Payment Method:
          {{
            this.paymentMethod == "bank" ? "Bank payment" : "Pay at the store"
          }}
        </p>

        <button
          @click="
            {
              resetStep();
              addBooking();
            }
          "
        >
          Checkout
        </button>
      </div>
    </form>
  </div>

  <br />
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
      <form @submit.prevent="">
        <div
          v-if="
            result.allDates.filter((e) => e.serviceId == service.id).length > 0
          "
        >
          <h1>Dates:</h1>
        </div>
        <div v-for="dateElement in result.allDates" :key="dateElement.id">
          <input
            v-model="dateId"
            type="radio"
            name="dateElement"
            :value="{
              id: dateElement.id,
              date: dateElement.date,
            }"
          />
          <label>{{ dateElement.date }}</label>
          <br />
        </div>
        <div
          v-if="
            result.allTimeslots.filter((e) => e.serviceId == service.id)
              .length > 0
          "
        >
          <h1>Timeslots:</h1>
          <div
            v-for="timeslotElement in result.allTimeslots"
            :key="timeslotElement.id"
          >
            <input
              v-model="timeId"
              type="radio"
              name="timeslotElement"
              :value="{
                id: timeslotElement.id,
                time: timeslotElement.time,
              }"
            />
            <label
              >Timeslot: {{ timeslotElement.time }} ({{
                timeslotElement.slots
              }}
              slots left)</label
            >
            <br />
          </div>
        </div>
        <button
          @click="
            handleSubmit(
              service.id,
              service.details,
              service.storeDetails,
              service.price,
              service.image,
              service.serviceCategoryId
            )
          "
          :disabled="user.cart.length > 1"
        >
          Add to cart
        </button>
      </form>
    </div>
    <div v-else><button>Unavailable</button></div>
  </div>
</template>

<script>
import {
  ALL_SERVICES_DATES_AND_TIMESLOTS,
  ADD_BOOKING,
  GET_ALL,
} from "../graphql-operations";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { ref } from "vue";
import { mapActions, mapState } from "vuex";
import store from "@/store";
import { useRoute } from "vue-router";
import router from "@/router";

export default {
  data() {
    return {
      step: 0,
    };
  },
  setup() {
    const dateId = ref();
    const timeId = ref();
    const firstName = ref("");
    const lastName = ref("");
    const address = ref("");
    const contactNumber = ref("");
    const emailAddress = ref("");
    const street = ref("");
    const baranggay = ref("");
    const city = ref("");
    const province = ref("");
    const postalCode = ref("");
    const paymentMethod = ref("");
    const errorMutation = ref("");
    const route = useRoute();

    const { result, loading, error } = useQuery(
      ALL_SERVICES_DATES_AND_TIMESLOTS,
      {
        fetchPolicy: "network-only",
      }
    );

    const {
      mutate: addBooking,
      onDone,
      onError,
    } = useMutation(ADD_BOOKING, () => ({
      variables: {
        bookingDate: Date.now().toString(),
        nameOfCustomer: firstName.value + " " + lastName.value,
        serviceId: store.state.user.cart[0].id,
        amount: store.state.user.cart[0].price,
        status: "pending",
        date: store.state.user.cart[0].date.date,
        time: store.state.user.cart[0].time.time,
      },
      refetchQueries: [{ query: GET_ALL }],
    }));

    onError((e) => {
      console.log(e);
      errorMutation.value = "Error during service creation";
    });

    onDone((result) => {
      console.log("ondone " + result);
      store.dispatch("clearCart");
      dateId.value = {};
      timeId.value = {};
      firstName.value = "";
      lastName.value = "";
      address.value = "";
      contactNumber.value = "";
      emailAddress.value = "";
      street.value = "";
      baranggay.value = "";
      city.value = "";
      province.value = "";
      postalCode.value = "";
      paymentMethod.value = "";
    });

    return {
      result,
      loading,
      error,
      errorMutation,
      addBooking,
    };
  },
  methods: {
    ...mapActions(["ADD_TO_CART"]),
    handleSubmit(id, details, storeDetails, price, image, serviceCategoryId) {
      const serviceObject = {
        id: id,
        details: details,
        storeDetails: storeDetails,
        price: price,
        image: image,
        firstName: this.firstName,
        lastName: this.lastName,
        serviceCategoryId: serviceCategoryId,
        date: {
          id: this.dateId.id,
          date: this.dateId.date,
        },
        time: {
          id: this.timeId.id,
          time: this.timeId.time,
        },
      };

      if (store.state.user.cart.length >= 1) {
        return;
      }

      store.dispatch("addToCart", {
        service: serviceObject,
      });

      this.date = "";
      this.time = "";
    },
    incrementStep() {
      this.step++;
      console.log(this.step);
    },
    decrementStep() {
      this.step--;
    },
    resetStep() {
      this.step = 0;
    },
  },
  computed: {
    ...mapState(["user"]),
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
