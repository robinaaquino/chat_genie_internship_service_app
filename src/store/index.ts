import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      token: "",
      role: "",
      cart: Array<any>(),
    },
  },
  getters: {
    getUserRole: (state: any) => () => {
      return state.user.role;
    },
    getUserToken: (state: any) => () => {
      return state.user.token;
    },
  },
  mutations: {
    ADD_TO_CART(state: any, service: any) {
      state.user.cart.push(service);
    },
    REMOVE_FROM_CART(state: any, service: any) {
      state.user.cart = state.user.cart.filter(
        (serviceObject: any) => serviceObject.id === service.id
      );
    },
    SET_USER(state: any, { token, role }: { token: any; role: any }) {
      state.user.token = token;
      state.user.role = role;
    },
    CLEAR_USER(state: any) {
      state.user.token = "";
      state.user.role = "";
      state.user.cart = [];
    },
  },
  actions: {
    addToCart({ commit }: { commit: any }, { service }: { service: any }) {
      commit("ADD_TO_CART", service);
    },
    removeFromCart({ commit }: { commit: any }, { service }: { service: any }) {
      commit("REMOVE_FROM_CART", service);
    },
    setUser(
      { commit }: { commit: any },
      { token, role }: { token: any; role: any }
    ) {
      commit("SET_USER", { token, role });
    },
    clearUser({ commit }: { commit: any }) {
      commit("CLEAR_USER");
    },
  },
  modules: {},
});
