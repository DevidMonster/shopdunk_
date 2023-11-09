import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { getMainDefinition } from "apollo-utilities";
import omitDeep from "omit-deep-lodash";
import axios from "axios";
import { WebSocketLink } from "@apollo/client/link/ws";

export const instance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const cleanTypenameLink = new ApolloLink((operation, forward) => {
  // more keys like timestamps could be included here
  const keysToOmit = ["__typename"];

  const def = getMainDefinition(operation.query);
  if (def && "operation" in def) {
    if (def.operation === "mutation") {
      operation.variables = omitDeep(operation.variables, keysToOmit);
    }
  }
  return forward ? forward(operation) : null;
});

const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql", // Địa chỉ của API GraphQL
  // headers: {
  //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImVtYWlsIjoidXNlcjVAZ21haWwuY29tIiwiaWF0IjoxNjk1MjkyNDY5LCJleHAiOjE2OTUzNzg4Njl9.nvkAtsgUngbchskjqNOvVcf_FPVKn5EOtgdqxPzpvew`, // Thay thế yourAccessToken bằng giá trị thực tế của access token
  // },
  credentials: "include",
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:8000/graphql`,
  options: {
    reconnect: true,
  },
});

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

export const client = new ApolloClient({
  link: ApolloLink.from([cleanTypenameLink, splitLink]),
  cache: new InMemoryCache(),
});
