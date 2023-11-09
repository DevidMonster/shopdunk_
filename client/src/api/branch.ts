import { gql } from "@apollo/client";

export const GET_BRANCHS = gql`
  query Branchs {
    branchs {
      address
      branchName
      code
      id
      provinceCode
    }
  }
`;

export const GET_BRANCH = gql`
  query Branch($id: Int!) {
    branch(id: $id) {
      address
      branchName
      code
      id
      provinceCode
    }
  }
`;

export const CREATE_BRANCH = gql`
  mutation CreateBranch($createBranchInput: CreateBranchInput!) {
    createBranch(createBranchInput: $createBranchInput) {
      address
      branchName
      code
      id
      provinceCode
    }
  }
`;

export const UPDATE_BRANCH = gql`
  mutation UpdateBranch ($updateBranchInput: UpdateBranchInput!) {
    updateBranch(updateBranchInput: $updateBranchInput) {
      address
      branchName
      code
      id
      provinceCode
    }
  }
`;

export const DELETE_BRANCH = gql`
  mutation RemoveBranch($id: Int!) {
    removeBranch(id: $id) {
      address
      branchName
      code
      provinceCode
    }
  }
`;
