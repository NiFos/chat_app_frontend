import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

let accessToken = "";
const cache = new InMemoryCache();
export const apolloClient = new ApolloClient<NormalizedCacheObject>({
  cache,
  link: ApolloLink.from([
    new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          authorization: accessToken,
        },
      });
      return forward(operation);
    }),
    new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_URL || "",
      credentials: "same-origin",
    }),
  ]),
});

export function setAccessToken(token: string) {
  accessToken = token;
}
export function getAccessToken(): string {
  return accessToken;
}
