import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "./backend";
import { plugin, defaultConfig } from "@formkit/vue";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(plugin, defaultConfig).use(store).use(router).mount("#app");
