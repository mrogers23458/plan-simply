import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
  mutation CreateToDo(
    $title: String!
    $description: String!
    $dueDate: String!
  ) {
    todoResponse: createToDo(
      title: $title
      description: $description
      dueDate: $dueDate
    ) {
      user {
        id
        firstName
        lastName
        username
        email
        todos {
          id
          title
          description
          completed
          dueDate
          __typename
        }
      }
      todo {
        id
        title
        description
        dueDate
      }
    }
  }
`;

export const UPDATE_TODO_COMPLETED = gql`
  mutation UpdateCompleted($todoId: String!, $completed: Boolean!) {
    updatedTodo: updateCompleted(id: $todoId, completed: $completed) {
      id
      title
      description
      dueDate
      completed
    }
  }
`;
