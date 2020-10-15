/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery, useMutation } from "@apollo/client";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Button } from "../../components/button";
import { Divider } from "../../components/divider";
import { chatMutation } from "../../graphql/mutations/chat.mutation";
import { authQuery } from "../../graphql/queries/auth.query";
import { chatQuery } from "../../graphql/queries/chat.query";
import { ChatList } from "./chatList";
import { ChatMessages } from "./chatMessages";

export const chatPagePath = `/chat`;
interface Props extends RouteComponentProps {}

function ChatPageComponent(props: Props) {
  const [showChats, setShowChats] = React.useState(true);
  const [currentChat, setCurrentChat] = React.useState("");
  const [getUserId, userId] = useLazyQuery(authQuery.GET_USER_ID, {
    fetchPolicy: "cache-first",
  });
  const [getChatData, chatsData] = useLazyQuery(chatQuery.GET_CHATS);
  const [sendMessage] = useMutation(chatMutation.SEND_MESSAGE);
  const [getCurrentChat] = useLazyQuery(chatQuery.GET_CURRENT_CHAT);
  const [newChat] = useMutation(chatMutation.ADD_CHAT);

  React.useEffect(() => {
    getUserId();
  }, []);
  React.useEffect(() => {
    if (!userId.loading && userId.data?.me.userId) {
      const id = userId.data.me.userId;
      getChatData({
        variables: {
          userId: id,
        },
      });
    }
  }, [userId]);

  React.useEffect(() => {
    getCurrentChat({
      variables: {
        id: currentChat,
      },
    });
  }, [currentChat]);

  function newChatHandler(graphqlUsers: any[], name: string) {
    newChat({
      variables: {
        members: graphqlUsers,
        name,
      },
    });
  }

  function changeCurrentChatHandler(id: string) {
    setCurrentChat(id);
  }
  return (
    <div className="container mx-auto md:w-6/12 pl-3 pr-3">
      {showChats ? (
        !chatsData.loading ? (
          <ChatList
            chats={chatsData?.data?.chats || []}
            userId={userId.data?.me?.userId || ""}
            newChatHandler={newChatHandler}
            changeCurrentChat={changeCurrentChatHandler}
            currentChat={currentChat}
          />
        ) : (
          <span>Loading...</span>
        )
      ) : null}
      <div>
        <div>
          <Button
            onClick={() => setShowChats(!showChats)}
            className={`${
              showChats ? "bg-blue-400" : "bg-blue-200"
            } mt-3 text-white hover:bg-opacity-75 rounded pl-2 pr-2`}
          >
            {showChats ? "Hide chats" : "Show chats"}
          </Button>
        </div>
        <Divider />
        {currentChat !== "" ? (
          <ChatMessages
            chatId={currentChat}
            sendHandler={(message) =>
              sendMessage({
                variables: {
                  chatId: currentChat,
                  userId: userId.data.me.userId,
                  text: message,
                },
              })
            }
          />
        ) : (
          <span>Select chat</span>
        )}
      </div>
    </div>
  );
}

export const ChatPage = withRouter(ChatPageComponent);
