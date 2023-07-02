import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import { typeDefs, resolvers } from "./schemas/index.js";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();
app.use(express.static(path.resolve(__dirname, "./ps_client_frontend/build")));
app.use(
  "/graphql",
  cors({
    origin: [
      "https://plan-simply-0a9e4110b7a5.herokuapp.com/",
      process.env.ORIGIN,
    ],
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
