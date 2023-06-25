import { userResolvers } from "./resolvers/users/userResolvers.js";
import { userTypeDefs } from "./typedefs/users/userTypeDefs.js";

export const resolvers = [userResolvers];
export const typeDefs = [userTypeDefs];
