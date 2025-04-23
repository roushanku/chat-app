import React, { use, useEffect, useState } from 'react';
import { UserPlus, Check } from 'lucide-react';
import { friendRequestSuggestion } from '../API/friendRequest.api.jsx';
import FriendSuggestionCard from './FriendSuggestionCard.jsx';

const FriendSuggestions = () => {
  // const friendSuggestions = [
  //   {
  //     id: 1,
  //     name: 'Emma Johnson',
  //     mutualFriends: 12
  //   },
  //   {
  //     id: 2,
  //     name: 'Alex Rodriguez',
  //     mutualFriends: 5
  //   },
  //   {
  //     id: 3,
  //     name: 'Sarah Kim',
  //     mutualFriends: 8
  //   }
  // ];

  const [friendSuggestion , setFriendSuggestion] = useState([]);

  useEffect (() => {
    const fetchFriendSuggestion = async () => {
      try {
        const storedUser = JSON.parse(sessionStorage.getItem("user"));
        const userId = storedUser?.data?.user?._id;
        const response = await friendRequestSuggestion(userId);
        console.log("API respponse " , response.data);
        setFriendSuggestion(response.data.data);
      } catch (error) {
        console.error("Error fetching friend suggestions:", error);
      }
    };

    fetchFriendSuggestion();
  } , [])

  return (
    <div className="flex flex-wrap justify-center">
      {friendSuggestion.map(friend => (
        <FriendSuggestionCard key={friend.id} friend={friend} />
      ))}
    </div>
  );
};

export default FriendSuggestions;