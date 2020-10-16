import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

let accessToken = "";
const cache = new InMemoryCache();

const wsUrl = process.env.REACT_APP_WS_GRAPHQL_URL || "";
const wsLink = new WebSocketLink({
  uri: wsUrl,
  options: {
    reconnect: true,
    connectionParams: {
      headers: accessToken
        ? {
            authorization: accessToken,
          }
        : {},
    },
  },
});

const httpLink = ApolloLink.from([
  new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: accessToken
        ? {
            authorization: accessToken,
          }
        : {},
    });
    return forward(operation);
  }),
  new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL || "",
    credentials: "include",
  }),
]);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const apolloClient = new ApolloClient<NormalizedCacheObject>({
  cache,
  link: splitLink,
  credentials: "include",
});

export function setAccessToken(token: string) {
  accessToken = token;
}
export function getAccessToken(): string {
  return accessToken;
}
