import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Users, Bell, Send, Zap, Shield, Smile, Image, CheckCircle, Star, Settings } from 'lucide-react';

const ChatAppLanding = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! How's it going?", sender: 'other', avatar: '/api/placeholder/40/40' },
    { id: 2, text: "I'm good! Just checking out this new chat app.", sender: 'me' },
    { id: 3, text: "It looks amazing! Love the animations.", sender: 'other', avatar: '/api/placeholder/40/40' }
  ]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [animateFeatures, setAnimateFeatures] = useState(false);
  
  // Trigger entrance animations
  useEffect(() => {
    setTimeout(() => setShowChat(true), 800);
    setTimeout(() => setAnimateFeatures(true), 1200);
    
    // Notification animation loop
    const notificationInterval = setInterval(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }, 8000);
    
    return () => clearInterval(notificationInterval);
  }, []);
  
  // Message animation
  useEffect(() => {
    if (showChat && currentMessageIndex < messages.length) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(prev => prev + 1);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [showChat, currentMessageIndex, messages.length]);
  
  // Pulse animation toggle
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setShowPulse(prev => !prev);
    }, 2000);
    
    return () => clearInterval(pulseInterval);
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: inputValue, sender: 'me' }]);
      setInputValue('');
      setCurrentMessageIndex(currentMessageIndex + 1);
    }
  };
  
  // Floating elements for background animation
  const floatingElements = Array(12).fill().map((_, i) => (
    <div 
      key={i}
      className="absolute rounded-full bg-indigo-500 bg-opacity-20 animate-float"
      style={{
        width: `${Math.random() * 80 + 20}px`,
        height: `${Math.random() * 80 + 20}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 20 + 15}s`,
        animationDelay: `${Math.random() * 5}s`
      }}
    />
  ));
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 overflow-hidden relative">
      {/* Animated floating background elements */}
      {floatingElements}
      
      {/* Notification animation */}
      <div className={`fixed top-4 right-4 bg-white rounded-lg shadow-xl p-4 flex items-center gap-3 transform transition-all duration-500 z-50 ${showNotification ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}>
        <div className="bg-green-500 rounded-full p-1">
          <CheckCircle size={20} className="text-white" />
        </div>
        <div>
          <p className="font-medium text-gray-800">New message received!</p>
          <p className="text-sm text-gray-500">Check your inbox now</p>
        </div>
      </div>
      
      {/* Header */}
      <header className="px-6 py-4 bg-indigo-800 bg-opacity-50 backdrop-blur-sm z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <MessageSquare className="text-indigo-300" size={24} />
              <div className={`absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full ${showPulse ? 'animate-ping' : ''}`}></div>
            </div>
            <h1 className="text-2xl font-bold text-white animate-shimmer">ChatApp</h1>
          </div>
          <div className="flex gap-4">
            <Link to='/register' className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              Sign Up
            </Link>
            <Link to='/login' className="px-4 py-2 text-sm font-medium text-indigo-200 border border-indigo-400 rounded-lg hover:bg-indigo-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              Log In
            </Link>
          </div>  
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex flex-col md:flex-row flex-1 px-6 py-12 gap-8 z-10">
        {/* Left side - Hero content */}
        <div className="flex flex-col justify-center flex-1 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight animate-gradientText">
              Connect instantly with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">ChatApp</span>
            </h2>
            <p className="text-xl text-indigo-200 animate-fadeSlideUp" style={{animationDelay: '0.3s'}}>
              Real-time messaging, seamless conversations, and beautiful animations
              make communication a delight.
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              { icon: <Zap size={20} className="text-indigo-300" />, text: "Lightning fast messaging experience" },
              { icon: <Users size={20} className="text-indigo-300" />, text: "Group chats with unlimited members" },
              { icon: <Shield size={20} className="text-indigo-300" />, text: "End-to-end encryption for your privacy" }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-3 transition-all duration-700 ${animateFeatures ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="p-2 bg-indigo-600 bg-opacity-50 rounded-full">
                  {feature.icon}
                </div>
                <p className="text-indigo-100">{feature.text}</p>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fadeSlideUp" style={{animationDelay: '0.9s'}}>
            <button className="px-6 py-3 text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg transform hover:-translate-y-1 animate-pulse-subtle">
              Get Started - It's Free
            </button>
            <button className="px-6 py-3 text-indigo-200 border border-indigo-400 rounded-xl font-medium hover:bg-indigo-800 transition-all duration-300 transform hover:-translate-y-1">
              See How It Works
            </button>
          </div>
        </div>
        
        {/* Right side - Chat UI Preview */}
        <div className="flex-1 flex justify-center items-center">
          <div className={`w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-700 ${showChat ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-8 opacity-0 rotate-3'}`}>
            {/* Chat header */}
            <div className="bg-indigo-600 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center text-white font-bold animate-pulse-slow">
                    T
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Team ChatApp</h3>
                    <p className="text-indigo-200 text-sm">Online now</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Star size={18} className="text-indigo-200 cursor-pointer hover:text-yellow-300 transition-colors" />
                  <Settings size={18} className="text-indigo-200 cursor-pointer hover:text-white transition-colors animate-spin-slow" />
                </div>
              </div>
            </div>
            
            {/* Chat messages */}
            <div className="p-4 h-80 overflow-y-auto bg-indigo-50">
              <div className="space-y-4">
                {messages.slice(0, currentMessageIndex).map((message, index) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs ${message.sender === 'me' 
                      ? 'bg-indigo-600 text-white rounded-tl-xl rounded-tr-sm rounded-br-xl rounded-bl-xl' 
                      : 'bg-white border border-indigo-100 text-gray-800 rounded-tr-xl rounded-tl-sm rounded-bl-xl rounded-br-xl'} 
                      px-4 py-3 shadow-sm animate-messageIn`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Chat input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 bg-indigo-50 rounded-xl px-4 py-2 border border-indigo-100 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-200 transition-all duration-300">
                  <Smile size={20} className="text-indigo-400" />
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent focus:outline-none text-gray-700"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <Image size={20} className="text-indigo-400" />
                </div>
                <button 
                  type="submit"
                  className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:rotate-3"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-6 px-6 text-center text-indigo-300 border-t border-indigo-800 relative z-10">
        <p>© 2025 ChatApp. All rights reserved.</p>
      </footer>
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0); }
        }
        
        @keyframes shimmer {
          0% { opacity: 0.8; }
          50% { opacity: 1; }
          100% { opacity: 0.8; }
        }
        
        @keyframes gradientText {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes messageIn {
          0% { opacity: 0; transform: translateY(10px) scale(0.9); }
          60% { opacity: 1; transform: translateY(-5px) scale(1.03); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes pulse-subtle {
          0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
          100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float linear infinite;
          animation-direction: alternate;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        
        .animate-gradientText {
          background: linear-gradient(90deg, #fff, #e0e7ff, #fff);
          background-size: 200% 200%;
          animation: gradientText 3s ease infinite;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .animate-fadeSlideUp {
          animation: fadeSlideUp 0.7s ease-out forwards;
        }
        
        .animate-messageIn {
          animation: messageIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ChatAppLanding;