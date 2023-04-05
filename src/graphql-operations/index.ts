import { gql } from "graphql-tag";

export const GET_ALL_USERS = gql`
  query AllUsers {
    allUsers {
      createdAt
      id
      passwordDigest
      role
      updatedAt
      username
    }
  }
`;

export const CREATE_CUSTOMER_USER = gql`
  mutation CreateCustomerUser($username: String!, $password: String!) {
    createCustomerUser(input: { password: $password, username: $username }) {
      user {
        createdAt
        id
        passwordDigest
        role
        updatedAt
        username
      }
      errors
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation SigninUser($username: String!, $password: String!) {
    signinUser(
      input: { credentials: { username: $username, password: $password } }
    ) {
      clientMutationId
      token
      errors
      user {
        createdAt
        id
        passwordDigest
        role
        updatedAt
        username
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser(input: {}) {
      clientMutationId
      errors
      token
    }
  }
`;

export const CREATE_SERVICE_CATEGORY = gql`
  mutation CreateServiceCategory(
    $name: String!
    $description: String!
    $image: String!
  ) {
    createServiceCategory(
      input: { name: $name, description: $description, image: $image }
    ) {
      clientMutationId
      errors
      serviceCategory {
        createdAt
        description
        id
        image
        name
        updatedAt
      }
    }
  }
`;

export const UPDATE_SERVICE_CATEGORY = gql`
  mutation UpdateServiceCategory(
    $id: ID!
    $name: String!
    $description: String!
    $image: String!
  ) {
    updateServiceCategory(
      input: { id: $id, name: $name, description: $description, image: $image }
    ) {
      clientMutationId
      errors
      serviceCategory {
        createdAt
        description
        id
        image
        name
        updatedAt
      }
    }
  }
`;

export const DELETE_SERVICE_CATEGORY = gql`
  mutation DeleteServiceCategory($id: ID!) {
    deleteServiceCategory(input: { id: $id }) {
      clientMutationId
      errors
    }
  }
`;

export const GET_ALL_SERVICE_CATEGORIES = gql`
  query AllServiceCategories {
    allServiceCategories {
      createdAt
      description
      id
      image
      name
      updatedAt
    }
  }
`;

export const GET_SERVICE_CATEGORY = gql`
  query ServiceCategoryFindById($id: ID!) {
    serviceCategoryFindById(id: $id) {
      createdAt
      description
      id
      image
      name
      updatedAt
    }
  }
`;

export const CREATE_SERVICE = gql`
  mutation CreateService(
    $details: String!
    $storeDetails: String!
    $price: Int!
    $addOn: String!
    $image: String!
    $serviceCategoryId: ID!
  ) {
    createService(
      input: {
        details: $details
        storeDetails: $storeDetails
        price: $price
        addOn: $addOn
        image: $image
        serviceCategoryId: $serviceCategoryId
      }
    ) {
      clientMutationId
      errors
      service {
        addOn
        createdAt
        details
        id
        image
        price
        serviceCategoryId
        storeDetails
        updatedAt
      }
    }
  }
`;

export const UPDATE_SERVICE = gql`
  mutation UpdateService(
    $id: ID!
    $details: String!
    $storeDetails: String!
    $price: Int!
    $addOn: String!
    $image: String!
    $serviceCategoryId: ID!
  ) {
    updateService(
      input: {
        id: $id
        details: $details
        storeDetails: $storeDetails
        price: $price
        addOn: $addOn
        image: $image
        serviceCategoryId: $serviceCategoryId
      }
    ) {
      clientMutationId
      errors
      service {
        addOn
        createdAt
        details
        id
        image
        price
        serviceCategoryId
        storeDetails
        updatedAt
      }
    }
  }
`;

export const DELETE_SERVICE = gql`
  mutation DeleteService($id: ID!) {
    deleteService(input: { id: $id }) {
      clientMutationId
      errors
      service {
        addOn
        createdAt
        details
        id
        image
        price
        serviceCategoryId
        storeDetails
        updatedAt
      }
    }
  }
`;

export const GET_ALL_SERVICES = gql`
  query AllServices {
    allServices {
      addOn
      createdAt
      details
      id
      image
      price
      serviceCategoryId
      storeDetails
      updatedAt
    }
  }
`;

export const GET_SERVICE = gql`
  query AllServices($id: ID!) {
    serviceFindById(id: $id) {
      addOn
      createdAt
      details
      id
      image
      price
      serviceCategoryId
      storeDetails
      updatedAt
    }
  }
`;

export const GET_ALL_SERVICES_AND_CATEGORIES = gql`
  query AllServices {
    allServices {
      addOn
      createdAt
      details
      id
      image
      price
      serviceCategoryId
      storeDetails
      updatedAt
    }
    allServiceCategories {
      createdAt
      description
      id
      image
      name
      updatedAt
    }
  }
`;
