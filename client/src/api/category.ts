import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  {
    categires{
      id
      name
    }
  }
`;
