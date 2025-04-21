import FriendRequest from "../Models/friendRequest.model.js";
async function SendfriendRequestService(senderId , receiverId) {
    try{
        const friendRequest = await FriendRequest.create({
            senderId,
            receiverId
        });
        return {status: 200, message: "Friend Request Sent Successfully", data: friendRequest};
    }
    catch(error) {
        console.log(error);
        return {status: 500, message: "Internal Server Error"};
    }
}

async function AcceptfriendRequestService(senderId , receiverId) {
    try{
        const friendRequest = await FriendRequest.findOneAndUpdate({
            senderId,
            receiverId
        }, {status: 'accepted'}, {new: true});
        return {status: 200, message: "Friend Request Accepted Successfully", data: friendRequest};
    }
    catch(error) {
        console.log(error);
        return {status: 500, message: "Internal Server Error"};
    }
}
async function RejectfriendRequestService(senderId , receiverId) {
    try{
        const friendRequest = await FriendRequest.findOneAndUpdate({
            senderId,
            receiverId
        }, {status: 'rejected'}, {new: true});
        return {status: 200, message: "Friend Request Rejected Successfully", data: friendRequest};
    }
    catch(error) {
        console.log(error);
        return {status: 500, message: "Internal Server Error"};
    }
}
async function GetfriendRequestService(userId) {
    try{
        const friendRequests = await FriendRequest.find({
            receiverId: userId,
            status: 'pending'
        }).populate('senderId', 'name email');
        return {status: 200, message: "Friend Requests Fetched Successfully", data: friendRequests};
    }
    catch(error) {
        console.log(error);
        return {status: 500, message: "Internal Server Error"};
    }
}

export {
    SendfriendRequestService,
    AcceptfriendRequestService,
    RejectfriendRequestService,
    GetfriendRequestService
}