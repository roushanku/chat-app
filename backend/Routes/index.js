import express from 'express'
import AuthRouter from './Auth/auth.route.js';
import ChatRouter from './chat/chat.route.js';
import MessageRouter from './Message/message.route.js';
import FriendRequestRouter from './friendRequest/friendRequest.route.js';
import FileHandlerRouter from './file-upload/file_handler.route.js';

const rootRouter = express.Router();

const defaultRoute = [
    {
        path : '/auth',
        router : AuthRouter
    },
    {
        path : '/chat',
        router : ChatRouter
    },
    {
        path : '/message',
        router : MessageRouter
    },
    {
        path : '/friendRequest',
        router : FriendRequestRouter
    },
    {
        path : '/file-upload',
        router : FileHandlerRouter
    }
]

defaultRoute.forEach(route => {
    rootRouter.use(route.path , route.router)
})

export default rootRouter