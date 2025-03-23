import React, { useState } from "react";
import { Send } from "lucide-react";

import { useUser } from "../../UserContext";
import { sendMessage } from "../../API/chat.api";
import MessageArea from "./MessageArea.jsx";
import { toast } from "react-toastify";

export default function MessageInput({ chatId }) {
  const {activeUser} = useUser();
  const [message, setMessage] = useState("");

  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const userId = storedUser?.data?.user?._id;


  //if message is sent from chat then it means chat is aleady created -- so send msg directly 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const sentMessageResponse = await sendMessage(chatId, userId, message, "text"); // now only text message is allowed
      // console.log("sentMessageResponse", sentMessageResponse.data);
      if(sentMessageResponse.status === 201) {
        console.log("Message sent successfully");
        const formattedMessage = [{
          id: sentMessageResponse.data._id,
          content: message,
          time: new Date().toLocaleTimeString([], { 
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          }),
          isSentByMe: true
        }];
        console.log("formattedMessage", formattedMessage);
        // console.log("formattedMessage is done...");
        <MessageArea messages={formattedMessage} />
        // console.log("MessageArea is done...");
        setMessage("");
      }
      else {
        toast.error("Message not sent");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t flex items-center">
      <input 
        type="text" 
        className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button 
        type="submit"
        className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
      >
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
}