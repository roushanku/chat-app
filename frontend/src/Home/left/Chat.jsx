import React from "react";
import { useState } from "react";
import ChatContainer from "../right/ChatContainer.jsx";
import {useUser} from '../../UserContext.jsx'

export default function User({ user }) {
  const {activeUser, setActiveUser} = useUser();

  // Function to handle user selection
  const handleUserClick = (user) => {
    console.log("user is clicked..." , user);
    setActiveUser(user);
  };

  return (
    <div onClick = {() => handleUserClick(user)} className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${user.isOnline ? 'bg-blue-50' : ''}`}>
      {/* User Avatar with Online Indicator */}
      <div className="relative flex-shrink-0">
        <img 
          src={user.avatar || "/api/placeholder/40/40"} 
          alt={`${user.name}`}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-gray-200"
        />
        {user.isOnline && (
          <span className="absolute bottom-0 right-0 block h-2 w-2 md:h-3 md:w-3 rounded-full bg-green-500 border-2 border-white"></span>
        )}
      </div>
      
      {/* User Info */}
      <div className="ml-2 md:ml-3 flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="text-sm md:text-base font-medium text-gray-900 truncate">{user.name}</h3>
          {user.time && <span className="text-xs text-gray-500">{user.time}</span>}
        </div>
        {user.lastMessage && (
          <p className="text-xs md:text-sm text-gray-500 truncate">{user.lastMessage}</p>
        )}
      </div>
    </div>
  );
}