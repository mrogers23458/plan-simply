import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

/* create http link connecting to graphql end point */
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

/* gets token from local storage and adds auth header to every request */
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("ps_token");
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

/* creates apollo client used for queries with auth and http link */
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
