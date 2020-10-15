import { gql } from "@apollo/client";

export const authQuery = {
  GET_GOOGLE_OAUTH: gql`
    query Auth {
      oauth {
        url
      }
    }
  `,
  GET_USER_ID: gql`
    query Me {
      me {
        userId
      }
    }
  `,
};
