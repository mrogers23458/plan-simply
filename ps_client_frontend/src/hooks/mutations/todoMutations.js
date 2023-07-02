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

export const UPDATE_TODO = gql`
  mutation EditTodo(
    $editTodoId: String!
    $title: String!
    $description: String
    $dueDate: String
  ) {
    todoResponse: editTodo(
      id: $editTodoId
      title: $title
      description: $description
      dueDate: $dueDate
    ) {
      user {
        id
        firstName
        lastName
        email
        username
        todos {
          id
          title
          description
          dueDate
          completed
        }
      }
      todo {
        id
        title
        description
        dueDate
        completed
        createdAt
      }
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: String!) {
    todoResponse: deleteTodo(id: $id) {
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
          dueDate
          completed
          createdAt
        }
      }
    }
  }
`;
