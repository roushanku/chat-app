import React from "react";

export default function MessageBubble({ message, isSentByMe }) {
  return (
    <div className={`${isSentByMe ? 'self-end bg-blue-500' : 'self-start bg-white'} 
                     p-3 rounded-lg shadow max-w-xs md:max-w-md`}>
      <p className={`${isSentByMe ? 'text-white' : 'text-gray-800'}`}>
        {message.content}
      </p>
      <span className={`text-xs ${isSentByMe ? 'text-blue-100' : 'text-gray-500'} 
                        mt-1 block text-right`}>
        {message.time}
      </span>
    </div>
  );
}