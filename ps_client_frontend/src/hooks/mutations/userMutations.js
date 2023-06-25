import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation (
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
