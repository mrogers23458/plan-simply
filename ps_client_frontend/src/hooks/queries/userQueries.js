import { gql } from "@apollo/client";

export const GET_ME = gql`
  query GetMe {
    me {
      id
      firstName
      lastName
      username
      email
      todos {
        id
        title
        description
        dueDate
        completed
        createdAt
        updatedAt
      }
    }
  }
`;
