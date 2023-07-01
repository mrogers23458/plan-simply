export const todoTypeDefs = `#gql 
type ToDo {
    id: ID!
    title: String!
    description: String
    dueDate: String
    completed: Boolean
    createdAt: String
    updatedAt: String
}

type TodoResponse {
    todo: ToDo!
    user: User!
  }

type Mutation {
    createToDo(title: String!, description: String!, dueDate: String, completed: Boolean): TodoResponse!
}

type Mutation {
    updateCompleted(id: String!, completed: Boolean!): ToDo!
}

type Mutation {
    deleteTodo(id: String!): TodoResponse!
}
`;
