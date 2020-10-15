import { gql } from "@apollo/client";

export const chatQuery = {
  GET_CHATS: gql`
    query Chats($userId: uuid!) {
      chats(where: { chat_members: { chat_member: { _eq: $userId } } }) {
        id
        chat_name
        chat_members {
          user {
            id
            username
          }
        }
      }
    }
  `,
  GET_CURRENT_CHAT: gql`
    query Chat($id: uuid!) {
      chats_by_pk(id: $id) {
        chat_members {
          user {
            username
          }
        }
        id
        chat_name
      }
    }
  `,
  SEARCH_USER: gql`
    query Search($search: String!) {
      users(where: { username: { _ilike: $search } }) {
        id
        username
      }
    }
  `,
};
