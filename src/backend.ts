import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import { Cloudinary } from "@cloudinary/url-gen";

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_URI,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
  fetch,
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
