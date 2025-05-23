import React from "react";
import { useSocketContext } from "../../context/socketContext";

export default function ChatHeader({ activeUser }) {
  const {onlineUsers} = useSocketContext();
  const isUserOnline = onlineUsers.includes(activeUser?.id);
  // If no active user is selected, provide default values
  const user = activeUser || { 
    name: "Select a conversation", 
    isOnline: true,
    avatar: "/api/placeholder/40/40"
  };

  return (
    <div className="bg-gray-100 p-3 border-b flex items-center">
      <div className="flex items-center">
        <img 
          src={user.avatar} 
          alt={`${user.name}`} 
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <h2 className="text-base font-medium">{user.name}</h2>
          <p className="text-xs text-gray-500">
            {isUserOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
}