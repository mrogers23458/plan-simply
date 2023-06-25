import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import typeDefs from "./schemas/typeDefs.js";
import resolvers from "./schemas/resolvers.js";

const app = express();
const PORT = 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use("/graphql", cors(), express.json(), expressMiddleware(server));

// Modified server startup
await new Promise((resolve) => app.listen({ port: PORT }, resolve));

console.log(`🚀 Server ready at http://localhost:${PORT}/`);
