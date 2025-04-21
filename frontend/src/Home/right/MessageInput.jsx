import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useUser } from "../../UserContext";
import { sendMessage } from "../../API/chat.api";
import { toast } from "react-toastify";
import { useSocketContext } from "../../context/socketContext.jsx";
// Import the notification sound
import notificationSound from "../../assets/notification.mp4";

export default function MessageInput({ chatId }) {
  const { activeUser } = useUser();
  const [message, setMessage] = useState("");
  const { socket } = useSocketContext();
  const audioRef = useRef(null);

  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const userId = storedUser?.data?.user?._id;

  // Create audio element when component mounts
  useEffect(() => {
    audioRef.current = new Audio(notificationSound);
    audioRef.current.preload = "auto";
  }, []);

  // Function to play notification sound
  const playNotificationSound = () => {
    if (audioRef.current) {
      // Reset the audio to the beginning if it was already played
      audioRef.current.currentTime = 0;
      // Play the notification sound
      audioRef.current.play().catch(error => {
        console.error("Error playing notification sound:", error);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      // First, add a local version of the message to provide instant feedback
      const localMessage = {
        _id: `local-${Date.now()}`,
        content: message,
        sender_id: userId,
        chat_id: chatId,
        type: "text",
        createdAt: new Date().toISOString()
      };
      
      // Reset message input immediately for better UX
      setMessage("");
      
      // Send message to server
      const sentMessageResponse = await sendMessage(chatId, userId, message, "text");
      
      if (sentMessageResponse.status === 201) {
        const newMessage = {
          _id: sentMessageResponse.data._id,
          content: message,
          sender_id: userId,
          chat_id: chatId,
          type: "text",
          createdAt: new Date().toISOString()
        };

        // Emit message via socket
        if (socket) {
          console.log("Emitting message via socket:", newMessage);
          socket.emit('sendMessage', {
            chatId,
            message: newMessage
          });
        }
        
        // Play notification sound when message is successfully sent
        playNotificationSound();
      } else {
        toast.error("Message not sent");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t flex items-center">
      <input 
        type="text" 
        className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button 
        type="submit"
        className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
      >
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
}