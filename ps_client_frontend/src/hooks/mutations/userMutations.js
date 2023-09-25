import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    user: createUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      user {
        firstName
        lastName
        username
        email
      }
      token
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    data: login(username: $username, password: $password) {
      user {
        firstName
        lastName
        email
        username
      }
      token
    }
  }
`;

export const EDIT_USER = gql`
  mutation EditUser(
    $id: String!
    $firstName: String
    $lastName: String
    $username: String
    $email: String
    $password: String
  ) {
    user: editUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      id
      firstName
      lastName
      email
      username
      password
    }
  }
`;
