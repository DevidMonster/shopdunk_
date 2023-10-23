import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
query Categories {
  categories {
    id
    name
    slug
    children {
        id
        name
        slug
        children {
            id
            name
            slug
            children {
                id
                name
                slug
                children {
                    id
                    name
                    slug
                }
            }
        }
    }
  }
}
`;

export const GET_CATEGORIE = gql`
query Category ($id: Int!) {
  category(id: $id) {
    id
    name
    slug
    children {
        id
        name
        slug
        children {
            id
            name
            slug
            children {
                id
                name
                slug
                children {
                    id
                    name
                    slug
                }
            }
        }
    }
  }
}
`;
