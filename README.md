# ChatApp - Multilingual Real-Time Messaging Application

## Overview

ChatApp is a modern real-time messaging application that supports text messaging, voice recordings with automatic transcription, and multilingual communication through integrated translation capabilities. Built with a React frontend and Node.js backend, the application leverages WebSockets for real-time communication and AI services for voice transcription and language translation.

## Features

### Real-Time Messaging
- Instant message delivery using Socket.IO
- Message read receipts
- Typing indicators
- Online/offline status indicators

### Voice Messaging
- In-app voice recording
- Audio playback controls
- Automatic speech-to-text transcription
- Recording duration display
- Optional transcription display

### Multilingual Support
- Language selection for message translation
- Support for 7 languages: English, Spanish, French, Hindi, Telugu, Tamil, and original (no translation)
- Automatic translation of outgoing messages
- Voice message transcription in selected language
- Visual indicators for translated content

### User Experience
- Responsive design for mobile and desktop
- Visual feedback during processing operations
- Notification sounds for new messages
- Clean, intuitive interface

## Technology Stack

### Frontend
- **React**: UI framework
- **CSS/TailwindCSS**: Styling
- **Lucide React**: Icons
- **Axios**: HTTP client
- **Socket.io-client**: WebSocket client for real-time features
- **React-Toastify**: Toast notifications

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **Socket.IO**: WebSocket server
- **JWT**: Authentication
- **Multer**: File uploads
- **Google Gemini AI**: Speech-to-text and translation services




## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Google Gemini API key for AI features

### Frontend Setup
```bash
cd frontend
npm install
npm run dev

### Backend Setup
```bash
cd backend
npm install

Create a .env file in the backend directory with the following variables:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key

npm start


Future Enhancements
End-to-end encryption for messages
Group chat functionality
File sharing capabilities
Message editing and deletion
Push notifications
Self-hosted translation services
Message search with transcription indexing
Voice message speed controls
Language auto-detection
