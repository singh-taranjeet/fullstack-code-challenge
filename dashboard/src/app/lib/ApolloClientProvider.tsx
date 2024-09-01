"use client";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `http://localhost:4000/graphql`,
  }),
  ssrMode: true,
});

export function ApolloClientProvider(
  props: Readonly<{ children: React.ReactNode }>
) {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
