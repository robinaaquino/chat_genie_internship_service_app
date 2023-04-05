import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import { Cloudinary } from "@cloudinary/url-gen";

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_URI,
  fetchOptions: {
    credentials: "include",
  },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const cld = new Cloudinary({
  cloud: {
    cloudName: "dsc75sbwu",
  },
});
