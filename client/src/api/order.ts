import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
mutation CreateOrder($createOrderInput: CreateOrderInput!) {
    createOrder(createOrderInput: $createOrderInput) {
        address
        createdAt
        customerName
        email
        id
        paymentMethod
        paymentStatus
        phoneNumber
        status
        totalAmount
        updatedAt
    }
}
`

export const GET_ORDERS = gql`
query Orders ($userId: Int) {
    orders (userId: $userId) {
        address
        createdAt
        customerName
        email
        id
        paymentMethod
        paymentStatus
        phoneNumber
        status
        totalAmount
        updatedAt
        orderDetails {
            id
            image
            option
            price
            productId
            productName
            quantity
        }
    }
}
`

export const GET_ORDER = gql`
query Order ($id: Int!) {
    order (id: $id) {
        address
        createdAt
        customerName
        email
        id
        paymentMethod
        paymentStatus
        phoneNumber
        status
        totalAmount
        updatedAt
        orderDetails {
            id
            image
            option
            price
            productId
            productName
            quantity
        }
    }
}
`