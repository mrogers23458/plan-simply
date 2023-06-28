import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
  mutation CreateToDo($title: String!, $description: String!) {
    createToDo(title: $title, description: $description) {
      title
      description
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
