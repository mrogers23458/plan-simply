export const userTypeDefs = `#gql
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    todos: [ToDo!]
  }

  type Session {
    user: User!
    token: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    me: User
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Session!
    login(username: String!, password: String!): Session!
  }
`;

export default userTypeDefs;
