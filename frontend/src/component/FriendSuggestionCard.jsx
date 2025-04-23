import React, { useState } from 'react';
import { UserPlus, Check } from 'lucide-react';


const FriendSuggestionCard = ({ friend }) => {
    const [requestSent, setRequestSent] = useState(false);
    const sendFriendRequest = () => {
      setRequestSent(true);
    };
  
    return (
      <div className="border rounded-lg p-4 w-64 m-2 shadow-sm">
        <div className="flex items-center space-x-4 mb-4">
          <img 
            src={`https://via.placeholder.com/100`} 
            alt={friend.name} 
            className="w-16 h-16 rounded-full object-cover" 
          />
          <div>
            <h3 className="font-bold">{friend.name}</h3>
            <p className="text-sm text-gray-500">
              {friend.mutualFriends} mutual friends
            </p>
          </div>
        </div>
        <button 
          onClick={sendFriendRequest} 
          disabled={requestSent}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 flex items-center justify-center"
        >
          {requestSent ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Request Sent
            </>
          ) : (
            <>
              <UserPlus className="mr-2 h-4 w-4" /> Add Friend
            </>
          )}
        </button>
      </div>
    );
  };

export default FriendSuggestionCard;