import React from "react";
import { Settings } from "lucide-react";

export default function UserProfile({ currentUser }) {
  // Default values if no user is provided
  const user = currentUser || {
    name: "John Doe",
    avatar: "/api/placeholder/40/40",
    status: "Available"
  };
  
  const statusColors = {
    "Available": "bg-green-500",
    "Busy": "bg-red-500",
    "Away": "bg-yellow-500",
    "Offline": "bg-gray-500"
  };
  
  return (
    <div className="bg-gray-50 p-3 flex flex-col items-center space-y-3">
      <div className="relative">
        <img 
          src={user.avatar} 
          alt="Your profile" 
          className="w-16 h-16 rounded-full object-cover"
        />
        <span className={`absolute bottom-0 right-0 block h-4 w-4 rounded-full ${statusColors[user.status]} border-2 border-white`}></span>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-medium">{user.name}</h3>
        <div className="flex items-center justify-center">
          <span className={`inline-block h-3 w-3 rounded-full ${statusColors[user.status]} mr-1`}></span>
          <p className="text-sm text-gray-500">{user.status}</p>
        </div>
      </div>
      <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
        <Settings className="h-6 w-6 text-gray-600" />
      </button>
    </div>
  );
}