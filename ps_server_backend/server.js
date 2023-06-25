import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import { typeDefs, resolvers } from "./schemas/index.js";

const app = express();
const PORT = 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use(
  "/graphql",
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      return { token: req.headers.authorization };
    },
  })
);

// Modified server startup
await new Promise((resolve) => app.listen({ port: PORT }, resolve));

console.log(`🚀 Server ready at http://localhost:${PORT}/`);
