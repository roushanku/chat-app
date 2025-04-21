import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageArea from "./MessageArea";
import MessageInput from "./MessageInput";

import { useUser } from "../../UserContext";
import { getMessage } from "../../API/chat.api";
import { useSocketContext } from "../../context/socketContext.jsx";

export default function ChatContainer() {
  const { socket } = useSocketContext();
  const { activeUser } = useUser();
  const chat_id = activeUser?.chat_id;

  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const userId = storedUser?.data?.user?._id;

  const [messages, setMessages] = useState([]);

  // Fetch initial messages
  useEffect(() => {
    if (!chat_id) return;

    const fetchMessages = async () => {
      try {
        const response = await getMessage(chat_id);
        if (response.data) {
          setMessages(response.data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [chat_id]);

  // Socket listener for new messages
  useEffect(() => {
    if (!socket || !chat_id) return;

    // Join the specific chat room
    socket.emit('joinChat', chat_id);
    
    console.log("Joined chat room:", chat_id);

    // Listen for new messages
    const handleNewMessage = (newMessage) => {
      console.log("New message received via socket:", newMessage);
      
      setMessages(prevMessages => {
        // Check if message already exists to prevent duplicates
        const isDuplicate = prevMessages.some(msg => 
          msg._id === newMessage._id || 
          (msg.content === newMessage.content && 
           msg.sender_id === newMessage.sender_id && 
           Math.abs(new Date(msg.createdAt) - new Date(newMessage.createdAt)) < 1000)
        );
        
        return isDuplicate ? prevMessages : [...prevMessages, newMessage];
      });
    };

    socket.on('getnewMessage', handleNewMessage);

    // Cleanup
    return () => {
      console.log("Leaving chat room:", chat_id);
      socket.off('getnewMessage', handleNewMessage);
      socket.emit('leaveChat', chat_id);
    };
  }, [socket, chat_id]);

  // Transform messages for display
  const transformMessages = (messages, userId) => {
    return messages.map((msg) => ({
      id: msg._id,
      content: msg.content,
      time: new Date(msg.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSentByMe: msg.sender_id === userId,
    }));
  };

  const formattedMessages = transformMessages(messages, userId);

  return (
    <div className="w-full h-full flex flex-col">
      <ChatHeader activeUser={activeUser} />
      <MessageArea messages={formattedMessages} />
      <MessageInput chatId={chat_id} />
    </div>
  );
}