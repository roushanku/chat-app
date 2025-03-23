import React, { useState } from "react";
import { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageArea from "./MessageArea";
import MessageInput from "./MessageInput";

import { useUser } from "../../UserContext";
import { getMessage } from "../../API/chat.api";

export default function ChatContainer() {
  const { activeUser, setActiveUser } = useUser();
  // console.log("activeUser" , activeUser);
  const chat_id = activeUser?.chat_id;

  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const userId = storedUser?.data?.user?._id;

  // console.log("userId", userId);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!chat_id) return; // Exit early if chat_id is falsy

    const fetchMessages = async () => {
      try {
        const response = await getMessage(chat_id);
        if (response.data) {
          setMessages(response.data);
        }
        console.log("messages", response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [chat_id]);

  const transformMessages = (messages, userId) => {
    return messages.map((msg, index) => ({
      id: index + 1,
      content: msg.content,
      time: new Date(msg.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSentByMe: msg.sender_id === userId,
    }));
  };

  console.log("messages", messages);

  const formattedMessages = transformMessages(messages, userId);
  console.log(formattedMessages);

  const handleSendMessage = (content) => {
    const newMessage = {
      id: messages.length + 1,
      content,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      isSentByMe: true,
    };

    setMessages([...messages, newMessage]);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <ChatHeader activeUser={activeUser} />
      <MessageArea messages={formattedMessages} />
      <MessageInput chatId={chat_id} />
    </div>
  );
}
