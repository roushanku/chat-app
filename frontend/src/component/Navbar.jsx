import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Users, MessageSquare, Bell, User, LogOut } from 'lucide-react';
import { useUser } from '../UserContext';
import { useSocketContext } from '../context/socketContext';
import PostList from './Post';

const NavBar = () => {
  const { activeUser, logoutUser } = useUser();
  const { socket } = useSocketContext();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const menuRef = useRef(null);
  const notificationRef = useRef(null);
  
  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Setup notification listeners
  useEffect(() => {
    if (socket) {
      socket.on('notification', handleNewNotification);
      socket.on('friendRequest', handleFriendRequest);
      
      return () => {
        socket.off('notification');
        socket.off('friendRequest');
      };
    }
  }, [socket]);
  
  const handleNewNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };
  
  const handleFriendRequest = (data) => {
    const notification = {
      id: Date.now(),
      type: 'FRIEND_REQUEST',
      sender: data.sender,
      time: new Date().toISOString()
    };
    handleNewNotification(notification);
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleNotifications = (e) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setUnreadCount(0);
    }
  };
  
  const handleLogout = () => {
    if (socket) {
      socket.disconnect();
    }
    logoutUser();
    navigate('/login');
  };
  
  const isActive = (path) => {
    return location.pathname === path ? 
      'text-blue-600 md:border-b-2 md:border-blue-600' : 
      'text-gray-700 hover:text-blue-600';
  };
  
  return (
    <div>
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/home" className="font-bold text-xl text-blue-600">
              ChatApp
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link 
              to="/home" 
              className={`flex flex-col items-center px-3 py-2 text-sm font-medium ${isActive('/home')}`}
            >
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            
            <Link 
              to="/friend-suggestion" 
              className={`flex flex-col items-center px-3 py-2 text-sm font-medium ${isActive('/friend-suggestion')}`}
            >
              <Users className="h-6 w-6" />
              <span className="text-xs mt-1">Friends</span>
            </Link>
            
            <Link 
              to="/post" 
              className={`flex flex-col items-center px-3 py-2 text-sm font-medium ${isActive('/post')}`}
            >
              <MessageSquare className="h-6 w-6" />
              <span className="text-xs mt-1">Posts</span>
            </Link>
            
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button 
                className={`flex flex-col items-center px-3 py-2 text-sm font-medium ${showNotifications ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                onClick={toggleNotifications}
              >
                <div className="relative">
                  <Bell className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-1">Alerts</span>
              </button>
              
              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-2 text-sm text-gray-500">No new notifications</div>
                    ) : (
                      notifications.map(notification => (
                        <div key={notification.id} className="px-4 py-2 hover:bg-gray-100">
                          <p className="text-sm font-medium">
                            {notification.type === 'FRIEND_REQUEST' ? 
                              `${notification.sender?.name || 'Someone'} sent you a friend request` : 
                              notification.message}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(notification.time).toLocaleTimeString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <Link 
              to="/chat" 
              className={`flex flex-col items-center px-3 py-2 text-sm font-medium ${isActive('/chat')}`}
            >
              <MessageSquare className="h-6 w-6" />
              <span className="text-xs mt-1">Chat</span>
            </Link>
            
            <Link 
              to="/profile" 
              className={`flex flex-col items-center px-3 py-2 text-sm font-medium ${isActive('/profile')}`}
            >
              <User className="h-6 w-6" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex flex-col items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600"
            >
              <LogOut className="h-6 w-6" />
              <span className="text-xs mt-1">Logout</span>
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div 
        ref={menuRef}
        className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/home"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/home')
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center">
              <Home className="h-5 w-5 mr-3" />
              <span>Home</span>
            </div>
          </Link>
          
          <Link
            to="/friend-suggestion"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/friend-suggestion')
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-3" />
              <span>Friends</span>
            </div>
          </Link>
          
          <Link
            to="/post"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/post')
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-3" />
              <span>Posts</span>
            </div>
          </Link>
          
          <Link
            to="/notifications"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/notifications')
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center">
              <Bell className="h-5 w-5 mr-3" />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
          </Link>
          
          <Link
            to="/chat"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/chat')
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-3" />
              <span>Chat</span>
            </div>
          </Link>
          
          <Link
            to="/profile"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/profile')
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center">
              <User className="h-5 w-5 mr-3" />
              <span>Profile</span>
            </div>
          </Link>
          
          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100"
          >
            <div className="flex items-center">
              <LogOut className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
    </nav>

    <div className="pt-16">
        <PostList />
    </div>

    </div>
  );
};

export default NavBar;