import express from 'express';
import { AcceptfriendRequestController, GetfriendRequestController, RejectfriendRequestController, SendfriendRequestController } from '../../controller/friendRequest.controller.js';

const FriendRequestRouter = express.Router();

FriendRequestRouter.post('/sendFriendRequest', SendfriendRequestController);
FriendRequestRouter.post('/acceptFriendRequest', AcceptfriendRequestController);
FriendRequestRouter.post('/rejectFriendRequest', RejectfriendRequestController);
FriendRequestRouter.get('/getFriendRequest', GetfriendRequestController);

export default FriendRequestRouter;
