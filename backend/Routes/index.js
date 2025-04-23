import express from 'express'
import AuthRouter from './Auth/auth.route.js';
import ChatRouter from './chat/chat.route.js';
import MessageRouter from './Message/message.route.js';
import FriendRequestRouter from './friendRequest/friendRequest.route.js';

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
    }
]

defaultRoute.forEach(route => {
    rootRouter.use(route.path , route.router)
})

export default rootRouter