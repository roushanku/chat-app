import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function MessageArea({ messages = [] }) {
  const lastMessageRef = useRef();

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const messageList = messages.length > 0 ? messages : [
    { id: 1, content: "Hey there! How's it going?", time: "10:30 AM", isSentByMe: false },
    { id: 2, content: "I'm doing great! How about you?", time: "10:32 AM", isSentByMe: true }
  ];

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 h-[400px]">
      <div className="flex flex-col space-y-2">
        {messageList.map((message, index) => (
          <div key={message.id} ref={index === messageList.length - 1 ? lastMessageRef : null}>
            <MessageBubble 
              message={message}
              isSentByMe={message.isSentByMe}
            />
          </div>
        ))}
      </div>
    </div>
  );
}