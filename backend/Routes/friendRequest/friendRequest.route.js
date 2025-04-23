import express from 'express';
import { AcceptfriendRequestController, FriendReuestSuggestionController, GetfriendRequestController, RejectfriendRequestController, SendfriendRequestController } from '../../controller/friendRequest.controller.js';

const FriendRequestRouter = express.Router();

FriendRequestRouter.post('/send', SendfriendRequestController);
FriendRequestRouter.post('/accept', AcceptfriendRequestController);
FriendRequestRouter.post('/reject', RejectfriendRequestController);
FriendRequestRouter.get('/getFriendRequest', GetfriendRequestController);
FriendRequestRouter.get('/suggestion', FriendReuestSuggestionController);

export default FriendRequestRouter;
