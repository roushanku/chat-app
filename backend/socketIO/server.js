import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  },
  pingTimeout: 60000, // Increase ping timeout
  pingInterval: 25000, // Increase ping interval
});

const users = {};

io.on("connection", (socket) => {
  console.log("New socket connection:", socket.id);
  
  const userId = socket.handshake.query.userId;
  console.log("Connected User ID:", userId);

  if (userId) {
    // Ensure unique socket mapping
    if (users[userId]) {
      // If user already has a socket, disconnect the old one
      const existingSocket = io.sockets.sockets.get(users[userId]);
      if (existingSocket) {
        existingSocket.disconnect(true);
      }
    }
    
    // Map user ID to socket ID
    users[userId] = socket.id;
    console.log("Active users map:", users);
  }

  // Emit online users to all clients
  io.emit("getOnline", Object.keys(users));

  // Handle sending messages
  socket.on('sendMessage', (data) => {
    console.log('Message received from client:', data);
    
    // Broadcast to the specific chat room
    io.to(data.chatId).emit('getnewMessage', data.message);
    
    // Also send directly to receiver if they're not in the room
    const participants = data.message.chat_id.participants || [];
    const receiverId = participants.find(id => id !== data.message.sender_id);
    
    if (receiverId && users[receiverId]) {
      io.to(users[receiverId]).emit('getnewMessage', data.message);
    }
  });

  socket.on('joinChat', (chatId) => {
    socket.join(chatId);
    console.log(`User ${userId} joined chat room: ${chatId}`);
  });

  socket.on('leaveChat', (chatId) => {
    socket.leave(chatId);
    console.log(`User ${userId} left chat room: ${chatId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    
    // Remove the user from the users object
    const disconnectedUserId = Object.keys(users).find(
      key => users[key] === socket.id
    );
    
    if (disconnectedUserId) {
      delete users[disconnectedUserId];
      io.emit("getOnline", Object.keys(users));
    }
  });
});

export const getReceiverSocket = (userId) => {
  return users[userId];
};

export { app, io, httpServer };