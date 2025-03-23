import React from "react";
import MessageBubble from "./MessageBubble";

export default function MessageArea({ messages = [] }) {
  // If no messages are provided, show some placeholder content
  console.log("inside MessageArea", messages);
  const messageList = messages.length > 0 ? messages : [
    {
      id: 1,
      content: "Hey there! How's it going?",
      time: "10:30 AM",
      isSentByMe: false
    },
    {
      id: 2,
      content: "I'm doing great! How about you?",
      time: "10:32 AM",
      isSentByMe: true
    }
  ];

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      <div className="flex flex-col space-y-2">
        {messageList.map(message => (
          <MessageBubble 
            key={message.id}
            message={message}
            isSentByMe={message.isSentByMe}
          />
        ))}
      </div>
    </div>
  );
}