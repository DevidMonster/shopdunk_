import { gql } from "@apollo/client";

export const GET_ALL_BANNER = gql`
  query Banners {
    banners {
      id
      imageUrl
      redirectUrl
      category {
        name
        slug
      }
    }
  }
`;

export const DELETE_BANNER = gql`
  mutation removeBanner($removeBannerId: Int!) {
    removeBanner(id: $removeBannerId) {
      message
    }
  }
`;

export const CREATE_BANNER = gql`
  mutation createBanner($createBannerInput: CreateBannerInput!) {
    createBanner(createBannerInput: $createBannerInput) {
      imageUrl
      redirectUrl
      categoryId
    }
  }
`;
