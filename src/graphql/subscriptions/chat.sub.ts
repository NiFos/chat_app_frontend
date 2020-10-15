import { gql } from "@apollo/client";

export const chatSub = {
  GET_MESSAGES: gql`
    subscription Messages($chatId: uuid!) {
      messages(where: { chat_id: { _eq: $chatId } }, order_by: { time: desc }) {
        message_text
        user {
          username
          id
        }
        time
        id
      }
    }
  `,
};
