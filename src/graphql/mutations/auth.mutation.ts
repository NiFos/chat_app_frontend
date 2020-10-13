import { gql } from "@apollo/client";

export const authMutation = {
  REFRESH_TOKEN: gql`
    mutation Refresh {
      refresh {
        accessToken
      }
    }
  `,
  LOGIN: gql`
    mutation Login($data: LoginInput!) {
      login(data: $data) {
        accessToken
      }
    }
  `,
  REGISTRATION: gql`
    mutation Registration($data: RegInput!) {
      registration(data: $data) {
        accessToken
      }
    }
  `,
};
