import React, { useState } from "react";
import Search from './left/Search.jsx';
import UserList from './left/ChatList.jsx';
import ChatContainer from './right/ChatContainer.jsx';
import { useUser } from '../UserContext.jsx';

export default function ChatPage() {
  const { activeUser, setActiveUser } = useUser();
  
  // State to control sidebar visibility on mobile
  const [showSidebar, setShowSidebar] = useState(false);

  const handleUserSelect = (user) => {
    setActiveUser(user);
    // Auto-hide sidebar on mobile after selecting a user
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };
  
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Left Panel - Users List */}
      <div 
        className={`${
          // On mobile: fixed position, controlled by showSidebar
          // On desktop: static position, always visible
          showSidebar ? 'fixed inset-0 z-40 md:relative md:inset-auto' : 'hidden md:block'
        } md:w-1/3 lg:w-1/4 border-r flex flex-col bg-white`}
      >
        <Search />
        <div className="flex-1 overflow-y-auto">
          <UserList
            onUserSelect={handleUserSelect}
            activeUserId={activeUser?.id}
          />
        </div>
      </div>
      
      {/* Backdrop for mobile */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Right Panel - Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Mobile header with menu button */}
        <div className="md:hidden flex items-center p-2 border-b">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="ml-2 flex items-center">
            <img 
              src={activeUser?.avatar || "/api/placeholder/40/40"} 
              alt={activeUser?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="ml-2 font-medium">{activeUser?.name}</span>
          </div>
        </div>
        
        <ChatContainer />
      </div>
    </div>
  );
}