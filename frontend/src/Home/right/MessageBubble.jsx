import React from "react";

export default function MessageBubble({ message, isSentByMe }) {
  return (
    <div className={`flex ${isSentByMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 rounded-lg shadow max-w-xs md:max-w-md 
                   ${isSentByMe ? "bg-blue-500 text-white" : "bg-white text-gray-800"}`}
      >
        <p>{message.content}</p>
        <span className={`text-xs mt-1 block text-right ${isSentByMe ? "text-blue-100" : "text-gray-500"}`}>
          {message.time}
        </span>
      </div>
    </div>
  );
}
