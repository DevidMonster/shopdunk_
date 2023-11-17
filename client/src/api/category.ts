import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
      slug
      banners {
        categoryId
        imageUrl
        redirectUrl
      }
      products {
        description
        id
        name
        slug
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
          price
          discount
          name
          slug
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
            price
            discount
            name
            slug
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
              price
              discount
              name
              slug
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
                price
                discount
                name
                slug
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

export const GET_CATEGORIES_NO_TREE = gql`
  query CategoriesNoTree {
    categoriesNoTree {
      id
      name
      slug
    }
  }
`;

export const GET_CATEGORIE_PARENT = gql`
  query CategoryParent($parentId: Int!) {
    categoryParent(parentId: $parentId) {
      id
      name
      slug
      products {
        description
        id
        price
        discount
        name
        slug
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
          price
          discount
          name
          slug
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
            price
            discount
            name
            slug
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
              price
              discount
              name
              slug
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
                price
                discount
                name
                slug
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

export const GET_CATEGORIE_SLUG = gql`
  query CategorySlug($slug: String!, $page: Int!) {
    categorySlug(slug: $slug, page: $page) {
      id
      name
      slug
      currentPage
      totalPages
      pageSize
      banners {
        categoryId
        id
        imageUrl
        redirectUrl
      }
      products {
        description
        id
        price
        discount
        name
        slug
        images {
          id
          imageUrl
        }
      }
      children {
        id
        name
        slug
        banners {
          categoryId
          id
          imageUrl
          redirectUrl
        }
        products {
          description
          id
          price
          discount
          name
          slug
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
            price
            discount
            name
            slug
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
              price
              discount
              name
              slug
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
                price
                discount
                name
                slug
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
  query Category($id: Int!) {
    category(id: $id) {
      id
      name
      slug
      products {
        description
        id
        price
        discount
        name
        slug
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
          price
          discount
          name
          slug
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
            price
            discount
            name
            slug
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
              price
              discount
              name
              slug
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
                price
                discount
                name
                slug
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
  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      id
      name
      slug
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput!) {
    updateCategory(updateCategoryInput: $updateCategoryInput) {
      id
      name
      slug
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation RemoveCategory($id: Int!) {
    removeCategory(id: $id) {
      name
      slug
    }
  }
`;
