import express from 'express';
import { SaveMessageController , fetchMessageController} from '../../controller/message.controller.js';

const MessageRouter = express.Router();

MessageRouter.post('/saveMessage' , SaveMessageController);
MessageRouter.get('/getMessage' , fetchMessageController);

export default MessageRouter;