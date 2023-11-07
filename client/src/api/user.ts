import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query Users {
    users {
      address
      avatar
      createdAt
      email
      id
      password
      phoneNumber
      role
      status
      updatedAt
      userName
    }
  }
`;

export const GET_USER = gql`
query User($id: Int!) {
    user(id: $id) {
        address
        avatar
        createdAt
        email
        id
        password
        phoneNumber
        role
        status
        updatedAt
        userName
    }
}
`;

export const UPDATE_USER = gql`
mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
        address
        avatar
        createdAt
        email
        id
        password
        phoneNumber
        role
        status
        updatedAt
        userName
    }
}
`

export const CREATE_USER = gql`
mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
        address
        avatar
        createdAt
        email
        id
        password
        phoneNumber
        role
        status
        updatedAt
        userName
    }
}

`

