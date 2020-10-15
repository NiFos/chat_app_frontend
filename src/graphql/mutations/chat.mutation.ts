import { gql } from "@apollo/client";

export const chatMutation = {
  ADD_CHAT: gql`
    mutation MyMutation(
      $members: [chat_member_insert_input!]!
      $name: String!
    ) {
      insert_chats_one(
        object: { chat_members: { data: $members }, chat_name: $name }
      ) {
        id
      }
    }
  `,
  SEND_MESSAGE: gql`
    mutation SendMessage($chatId: uuid!, $userId: uuid!, $text: String!) {
      insert_messages_one(
        object: { chat_id: $chatId, sender_id: $userId, message_text: $text }
      ) {
        message_text
        sender_id
        time
      }
    }
  `,
};
