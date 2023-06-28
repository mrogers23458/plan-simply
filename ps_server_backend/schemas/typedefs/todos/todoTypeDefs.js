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

type Mutation {
    createToDo(title: String!, description: String!, dueDate: String, completed: Boolean): ToDo!
}

type Mutation {
    updateCompleted(id: String!, completed: Boolean!): ToDo!
}
`;
