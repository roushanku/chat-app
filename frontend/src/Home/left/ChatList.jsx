import React, { use, useEffect } from "react";
import { useState } from "react";
import User from "./Chat";
import { getChats, getMessage } from '../../API/chat.api.jsx';
import { getuserDetails } from "../../API/auth.api.jsx";

export default function UserList() {

  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);

  const storedUser = sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // console.log("user" , user);
  // console.log(user.data.user._id);
  const userId = user.data.user._id;
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await getChats(userId);
        if (response.data.data) {
          setChats(response.data.data);
          // console.log("response.data" , response.data.data);

          const usersData = await Promise.all(
            response.data.data.map(async (chat) => {
              // Find the other participant
              const participantId = chat.participants.find(
                (id) => id !== user.id
              );

              // console.log("participantId" , participantId);
              // Fetch user details
              const userDetails = await getuserDetails(participantId);
              // console.log("userDetails" , userDetails.data.data);
              // Fetch last message
              const messageResponse = await getMessage(chat._id);
              // console.log("messageResponse" , messageResponse.data);


              const lastMessage = messageResponse.data[0]?.content;
              const timestamp = messageResponse.data[0]?.createdAt;

              // console.log("lastMessage" , lastMessage);
              // console.log("timestamp" , timestamp);

              return {
                chat_id : chat._id,
                id: userDetails.data.data._id,
                name: userDetails.data.data.name,
                avatar: userDetails.data.data.avatar || "/api/placeholder/40/40",
                isOnline: userDetails.data.data.isOnline || false,
                lastMessage: lastMessage,
                time: new Date(timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              };
            })  
          );

          

          setUsers(usersData);
          console.log("userData" , usersData);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchChats();
  },[]);

  return (
    <div className="overflow-y-auto h-full">
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
}
