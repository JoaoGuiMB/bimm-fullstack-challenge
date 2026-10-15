import { ApolloClient, InMemoryCache } from "@apollo/client";

export function createApolloClient() {
  return new ApolloClient({
    uri: "/graphql",
    cache: new InMemoryCache(),
  });
}

export const apolloClient = createApolloClient();
