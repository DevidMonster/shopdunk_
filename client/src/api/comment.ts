import { gql } from "@apollo/client";

export const GET_COMMENT_BY_PRODUCT = gql`
  query CommentByProduct($id: Int!) {
    commentByProduct(id: $id) {
      content
      createdAt
      name
      id
      children {
        content
        createdAt
        name
        id
        children {
          content
          createdAt
          name
          id
          children {
            content
            createdAt
            name
            id
          }
        }
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($createCommentInput: CreateCommentInput!) {
    createComment(createCommentInput: $createCommentInput) {
      content
      createdAt
      id
      information
      name
      productId
    }
  }
`;

export const COMMENT_ADDED_SUBSCRIPTION = gql`
  subscription CommentAdded {
    commentAdded {
      content
      createdAt
      name
      id
      children {
        content
        createdAt
        name
        id
        children {
          content
          createdAt
          name
          id
          children {
            content
            createdAt
            name
            id
          }
        }
      }
    }
  }
`;
