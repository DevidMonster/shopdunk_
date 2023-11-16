import { gql } from "@apollo/client";

export const GET_ALL_DISCOUNT_CODE = gql`
query GetDiscountCodeByCode {
    getAllDiscountCodes {
        code
        createdAt
        discountPercent
        id
    }
}

`

export const GET_DISCOUNT_BY_CODE = gql`
query GetDiscountCodeByCode ($code: String!) {
    getDiscountCodeByCode(code: $code) {
        code
        createdAt
        discountPercent
        id
    }
}
`

export const DELETE_CODE = gql`
mutation DeleteDiscountCode ($id: Int!) {
    deleteDiscountCode(id: $id)
}
`

export const CREATE_CODE = gql`
mutation CreateDiscountCode ($createDiscountCodeInput: CreateDiscountCodeInput!){
    createDiscountCode(createDiscountCodeInput: $createDiscountCodeInput) {
        code
        createdAt
        discountPercent
        id
    }
}
`
