import React from "react";
import { Button } from "../../components/button";
import { Divider } from "../../components/divider";
import { CreateChat, Iuser } from "./createChat";

interface Props {
  chats: any;
  userId: string;
  currentChat: string;
  newChatHandler: (graphqlUsers: any[], name: string) => void;
  changeCurrentChat: (id: string) => void;
}

export function ChatList(props: Props) {
  const [openNewChat, setOpenNewChat] = React.useState(false);

  function submitHandler(users: Iuser[], name: string) {
    const graphqlUsers = users.map((item) => {
      return { chat_member: item.id };
    });
    graphqlUsers.push({ chat_member: props.userId });
    props.newChatHandler(graphqlUsers, name);
  }
  return (
    <div>
      {openNewChat && <CreateChat submit={submitHandler} />}
      <div>
        <Button
          className={`mt-3 p-1 text-white rounded ${
            openNewChat ? "bg-red-400" : "bg-blue-400"
          }`}
          fullWidth
          onClick={() => setOpenNewChat(!openNewChat)}
        >
          {openNewChat ? "Close" : "New chat"}
        </Button>
      </div>
      <Divider />
      <div>
        {props.chats.map((item: any) => {
          return (
            <Button
              className={`pl-3 pr-3 m-1 rounded bg-white shadow-outline border-green-400 ${
                props.currentChat === item.id ? "bg-green-400" : ""
              }`}
              key={item.id}
              onClick={() => props.changeCurrentChat(item.id)}
            >
              {item.chat_name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
