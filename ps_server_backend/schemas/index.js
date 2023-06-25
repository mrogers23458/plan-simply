/* User Imports */
import { userResolvers } from "./resolvers/users/userResolvers.js";
import { userTypeDefs } from "./typedefs/users/userTypeDefs.js";

/* ToDo Imports */
import { todoResolvers } from "./resolvers/todos/todoResolvers.js";
import { todoTypeDefs } from "./typedefs/todos/todoTypeDefs.js";

export const resolvers = [userResolvers, todoResolvers];
export const typeDefs = [userTypeDefs, todoTypeDefs];
