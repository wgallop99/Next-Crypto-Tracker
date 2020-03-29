import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import withApollo from "next-with-apollo";
import fetch from "isomorphic-unfetch";
import { createHttpLink } from "apollo-link-http";

const GRAPHQL_URL = "/api/graphql";

const link = createHttpLink({
  fetch, // Switches between unfetch & node-fetch for client & server.
  uri: GRAPHQL_URL
});

export default withApollo(
  // You can get headers and ctx (context) from the callback params
  // e.g. ({ headers, ctx, initialState })

  ({ initialState }) =>
    new ApolloClient({
      link,
      cache: new InMemoryCache()
        // rehydrate the cache using the inital data passed from the server:
        .restore(initialState || {})
    })
);
