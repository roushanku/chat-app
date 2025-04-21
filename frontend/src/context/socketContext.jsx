import { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const ENDPOINT = "http://localhost:5000";
  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  const userId = storedUser?.data?.user?._id;

  useEffect(() => {
    if (userId) {
      console.log("Creating socket connection for user:", userId);
      
      // Modify socket connection options
      const newSocket = io(ENDPOINT, {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ['websocket', 'polling'], // Add polling as a fallback
        query: {
          userId: userId,
        },
      });

      // Add connection error handling
      newSocket.on('connect_error', (error) => {
        console.error('Socket Connection Error:', error);
      });

      // Add reconnection handling
      newSocket.on('reconnect', (attemptNumber) => {
        console.log(`Reconnected to socket after ${attemptNumber} attempts`);
      });

      newSocket.on('connect', () => {
        console.log('Socket connected successfully with ID:', newSocket.id);
        setSocket(newSocket);
      });

      newSocket.on("getOnline", (data) => {
        console.log("Online users:", data);
        setOnlineUsers(data);
      });
      
      // Debug: Listen for all incoming socket events
      const onevent = newSocket.onevent;
      newSocket.onevent = function(packet) {
        const args = packet.data || [];
        console.log('Socket event received:', args[0], args.slice(1));
        onevent.call(this, packet);
      };

      // Cleanup on unmount
      return () => {
        console.log("Disconnecting socket");
        newSocket.disconnect();
      };
    } else {
      // Disconnect if no user
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [userId]);

  return (
    <SocketContext.Provider value={{socket, onlineUsers}}>
      {children}
    </SocketContext.Provider>
  );
};