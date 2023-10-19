import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, } from '@apollo/client';
import { getMainDefinition } from "apollo-utilities"
import omitDeep from 'omit-deep-lodash'

const cleanTypenameLink = new ApolloLink((operation, forward) => {
  // more keys like timestamps could be included here
  const keysToOmit = ['__typename']

  const def = getMainDefinition(operation.query)
  if (def && def.operation === 'mutation') {
    operation.variables = omitDeep(operation.variables, keysToOmit)
  }
  return forward ? forward(operation) : null
})

const httpLink = new HttpLink({
  uri: 'http://localhost:8000/graphql', // Địa chỉ của API GraphQL
  // headers: {
  //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImVtYWlsIjoidXNlcjVAZ21haWwuY29tIiwiaWF0IjoxNjk1MjkyNDY5LCJleHAiOjE2OTUzNzg4Njl9.nvkAtsgUngbchskjqNOvVcf_FPVKn5EOtgdqxPzpvew`, // Thay thế yourAccessToken bằng giá trị thực tế của access token
  // },
  credentials: 'include',
});

export const client = new ApolloClient({
  link: ApolloLink.from([cleanTypenameLink, httpLink]),
  cache: new InMemoryCache()
});