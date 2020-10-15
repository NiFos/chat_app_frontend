import { useSubscription } from "@apollo/client";
import moment from "moment";
import React from "react";
import { Divider } from "../../components/divider";
import { Input } from "../../components/Input";
import { chatSub } from "../../graphql/subscriptions/chat.sub";

interface Props {
  chatId: string;
  sendHandler: (message: string) => void;
}

export function ChatMessages(props: Props) {
  const [message, setMessage] = React.useState("");
  const messages = useSubscription(chatSub.GET_MESSAGES, {
    variables: {
      chatId: props.chatId,
    },
  });
  function sendMessage(e?: any) {
    e.preventDefault();

    if (message !== "") {
      props.sendHandler(message);
      setMessage("");
    }
  }
  return (
    <div>
      <form className="flex justify-between" onSubmit={sendMessage}>
        <Input
          value={message}
          onChange={(value) => setMessage(value)}
          name="message"
          fullwidth
          placeholder="Enter message (Enter to send)"
        />
      </form>
      <Divider />
      {!messages.loading ? (
        !messages.error ? (
          messages.data && messages.data?.messages ? (
            messages.data?.messages.map((item: any) => {
              return (
                <div
                  key={item.id}
                  title={moment(item.time).format("MMM Do YY")}
                >
                  ({moment(item.time).fromNow()}): {item.user.username} -{" "}
                  {item.message_text}
                </div>
              );
            })
          ) : (
            <span>There is nothing yet</span>
          )
        ) : (
          <span>Something went wrong!</span>
        )
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}
