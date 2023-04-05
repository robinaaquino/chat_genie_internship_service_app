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
