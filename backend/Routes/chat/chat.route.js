import express from 'express';
import {chatController , CreateNewChatController} from '../../controller/chat.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';
const ChatRouter = express.Router();

ChatRouter.post('/newChat' , CreateNewChatController);
ChatRouter.get('/getAllconversation' , chatController);

export default ChatRouter;