import { ApolloClient, InMemoryCache, } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql', // Địa chỉ của API GraphQL
    cache: new InMemoryCache(),
    // headers: {
    //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImVtYWlsIjoidXNlcjVAZ21haWwuY29tIiwiaWF0IjoxNjk1MjkyNDY5LCJleHAiOjE2OTUzNzg4Njl9.nvkAtsgUngbchskjqNOvVcf_FPVKn5EOtgdqxPzpvew`, // Thay thế yourAccessToken bằng giá trị thực tế của access token
    // },
    credentials: 'include',
  });