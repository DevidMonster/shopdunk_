import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
query Categories {
  categories {
    id
    name
    slug
    products {
      description
      id
      name
      images {
        id
        imageUrl
      }
    }
    children {
        id
        name
        slug
        products {
          description
          id
          name
          images {
            id
            imageUrl
          }
        }
        children {
            id
            name
            slug
            products {
              description
              id
              name
              images {
                id
                imageUrl
              }
            }
            children {
                id
                name
                slug
                products {
                  description
                  id
                  name
                  images {
                    id
                    imageUrl
                  }
                }
                children {
                    id
                    name
                    slug
                    products {
                      description
                      id
                      name
                      images {
                        id
                        imageUrl
                      }
                    }
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
    products {
      description
      id
      name
      images {
        id
        imageUrl
      }
    }
    children {
        id
        name
        slug
        products {
          description
          id
          name
          images {
            id
            imageUrl
          }
        }
        children {
            id
            name
            slug
            products {
              description
              id
              name
              images {
                id
                imageUrl
              }
            }
            children {
                id
                name
                slug
                products {
                  description
                  id
                  name
                  images {
                    id
                    imageUrl
                  }
                }
                children {
                  id
                  name
                  slug
                  products {
                    description
                    id
                    name
                    images {
                      id
                      imageUrl
                    }
                  }
                }
            }
        }
    }
  }
}
`;

export const CREATE_CATEGORY = gql`
mutation CreateCategory ($createCategoryInput: CreateCategoryInput!) {
  createCategory(createCategoryInput: $createCategoryInput) {
      id
      name
      slug
  }
}
`

export const UPDATE_CATEGORY = gql`
mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput!) {
  updateCategory(updateCategoryInput: $updateCategoryInput) {
      id
      name
      slug
  }
}
`

export const DELETE_CATEGORY = gql`
mutation RemoveCategory ($id: Int!) {
  removeCategory(id: $id) {
      name
      slug
  }
}
`