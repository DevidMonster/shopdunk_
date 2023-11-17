import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Products($q: String!, $page: Int) {
    products(q: $q, page: $page) {
      currentPage
      pageSize
      totalPages
      data {
        id
        name
        slug
        price
        discount
        description
        images {
          id
          imageUrl
          product {
            id
          }
        }
        options {
          id
          optionName
          optionValues {
            id
            valueName
          }
        }
        productSkus {
          images {
            id
            imageUrl
            product {
              id
            }
            productSkus {
              id
            }
          }
          skuValues {
            id
            optionValue {
              valueName
            }
          }
          id
          price
          quantity
          sku
          status
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query Product($id: Int!) {
    product(id: $id) {
      createdAt
      description
      id
      name
      images {
        id
        imageUrl
        product {
          id
        }
      }
      price
      discount
      updatedAt
      category {
        id
        name
        slug
      }
      productSkus {
        images {
          id
          imageUrl
          product {
            id
          }
          productSkus {
            id
          }
        }
        skuValues {
          id
          optionValue {
            valueName
          }
        }
        id
        price
        quantity
        sku
        status
      }
      options {
        id
        optionName
        optionValues {
          id
          valueName
        }
      }
    }
  }
`;

export const GET_PRODUCT_SLUG = gql`
  query ProductSlug($slug: String!) {
    productSlug(slug: $slug) {
      createdAt
      description
      id
      name
      images {
        id
        imageUrl
        product {
          id
        }
      }
      price
      discount
      updatedAt
      category {
        id
        name
        slug
      }
      productSkus {
        images {
          id
          imageUrl
          product {
            id
          }
          productSkus {
            id
          }
        }
        skuValues {
          id
          optionValue {
            valueName
          }
        }
        id
        price
        quantity
        sku
        status
      }
      options {
        id
        optionName
        optionValues {
          id
          valueName
        }
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
      description
      price
      discount
      name
      createdAt
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($updateProductInput: UpdateProductInput!) {
    updateProduct(updateProductInput: $updateProductInput) {
      id
      description
      price
      discount
      name
      createdAt
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation RemoveProduct($id: Int!) {
    removeProduct(id: $id) {
      createdAt
      description
      name
      price
      discount
      updatedAt
    }
  }
`;
