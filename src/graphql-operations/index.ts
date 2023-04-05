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

export const GET_ALL = gql`
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
    allDates {
      createdAt
      date
      id
      serviceId
      updatedAt
    }
    allTimeslots {
      createdAt
      id
      serviceId
      slots
      time
      updatedAt
    }
  }
`;

export const CREATE_DATE = gql`
  mutation CreateDate($date: String!, $serviceId: ID!) {
    createDate(input: { date: $date, serviceId: $serviceId }) {
      clientMutationId
      errors
      serviceDate {
        createdAt
        date
        id
        serviceId
        updatedAt
      }
    }
  }
`;

export const CREATE_TIMESLOT = gql`
  mutation CreateTimeslot($time: String!, $slots: Int!, $serviceId: ID!) {
    createTimeslot(
      input: { time: $time, slots: $slots, serviceId: $serviceId }
    ) {
      clientMutationId
      errors
      serviceTimeslot {
        createdAt
        id
        serviceId
        slots
        time
        updatedAt
      }
    }
  }
`;

export const UPDATE_TIMESLOT = gql`
  mutation UpdateTimeslot($id: ID!, $slots: Int!) {
    updateTimeslot(input: { id: $id, slots: $slots }) {
      clientMutationId
      errors
      serviceTimeslot {
        createdAt
        id
        serviceId
        slots
        time
        updatedAt
      }
    }
  }
`;

export const DELETE_DATE = gql`
  mutation DeleteDate($id: ID!) {
    deleteDate(input: { id: $id }) {
      clientMutationId
      errors
      serviceDate {
        createdAt
        id
        serviceId
        slots
        time
        updatedAt
      }
    }
  }
`;

export const DELETE_TIMESLOT = gql`
  mutation DeleteTimeslot($id: ID!) {
    deleteTimeslot(input: { id: $id }) {
      clientMutationId
      errors
      serviceTimeslot {
        createdAt
        date
        id
        serviceId
        updatedAt
      }
    }
  }
`;

export const GET_DATES_GIVEN_SERVICE = gql`
  query AllDatesGivenService($serviceId: ID!) {
    allDatesGivenService(serviceId: $serviceId) {
      createdAt
      date
      id
      serviceId
      updatedAt
    }
  }
`;

export const GET_TIMESLOTS_GIVEN_SERVICE = gql`
  query AllTimeslotsGivenService($serviceId: ID!) {
    allTimeslotsGivenService(serviceId: $serviceId) {
      createdAt
      id
      serviceId
      slots
      time
      updatedAt
    }
  }
`;

export const GET_DATES_AND_TIMESLOTS_GIVEN_SERVICE = gql`
  query GetDatesAndTimeslotsGivenService($serviceId: ID!) {
    allTimeslotsGivenService(serviceId: $serviceId) {
      createdAt
      id
      serviceId
      slots
      time
      updatedAt
    }
    allDatesGivenService(serviceId: $serviceId) {
      createdAt
      date
      id
      serviceId
      updatedAt
    }
  }
`;

export const ALL_TIMESLOTS = gql`
  query AllTimeslots {
    allTimeslots {
      createdAt
      id
      serviceId
      slots
      time
      updatedAt
    }
  }
`;

export const ALL_DATES = gql`
  query AllDates {
    allDates {
      createdAt
      date
      id
      serviceId
      updatedAt
    }
  }
`;

export const ALL_DATES_AND_TIMESLOTS = gql`
  query AllDatesAndTimeslots {
    allDates {
      createdAt
      date
      id
      serviceId
      updatedAt
    }
    allTimeslots {
      createdAt
      id
      serviceId
      slots
      time
      updatedAt
    }
  }
`;

export const ALL_SERVICES_DATES_AND_TIMESLOTS = gql`
  query AllServicesDatesAndTimeSlots {
    allDates {
      createdAt
      date
      id
      serviceId
      updatedAt
    }
    allTimeslots {
      createdAt
      id
      serviceId
      slots
      time
      updatedAt
    }
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

export const ALL_BOOKINGS = gql`
  query AllBookings {
    allBookings {
      amount
      bookingDate
      createdAt
      date
      id
      nameOfCustomer
      serviceId
      status
      time
      updatedAt
    }
  }
`;

export const ADD_BOOKING = gql`
  mutation CreateBooking(
    $bookingDate: String!
    $nameOfCustomer: String!
    $serviceId: ID!
    $amount: Int!
    $status: String!
    $date: String!
    $time: String!
  ) {
    createBooking(
      input: {
        bookingDate: $bookingDate
        nameOfCustomer: $nameOfCustomer
        serviceId: $serviceId
        amount: $amount
        status: $status
        date: $date
        time: $time
      }
    ) {
      clientMutationId
      errors
      booking {
        amount
        bookingDate
        createdAt
        date
        id
        nameOfCustomer
        serviceId
        status
        time
        updatedAt
      }
    }
  }
`;

export const UPDATE_BOOKING = gql`
  mutation UpdateBooking($id: ID!, $status: String!) {
    updateBooking(input: { id: $id, status: $status }) {
      clientMutationId
      errors
      booking {
        amount
        bookingDate
        createdAt
        date
        id
        nameOfCustomer
        serviceId
        status
        time
        updatedAt
      }
    }
  }
`;
