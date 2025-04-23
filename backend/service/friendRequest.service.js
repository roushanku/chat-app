import FriendRequest from "../Models/friendRequest.model.js";
import User from "../Models/user.model.js";

async function FriendRequestSuggestionService(userId, limit = 10) {
    try {
        // Find the current user to get their details (might be needed for matching algorithm)
        const currentUser = await User.findById(userId);
        
        if (!currentUser) {
            return { status: 404, message: "User not found" };
        }

        // 1. Find all existing connections (both accepted requests and received accepted requests)
        const sentAcceptedRequests = await FriendRequest.find({
            senderId: userId,
            status: "accepted"
        }).select('receiverId -_id');
        
        const receivedAcceptedRequests = await FriendRequest.find({
            receiverId: userId,
            status: "accepted"
        }).select('senderId -_id');
        
        // Extract IDs of friends (users that have an accepted connection)
        const friendIds = [
            ...sentAcceptedRequests.map(req => req.receiver.toString()),
            ...receivedAcceptedRequests.map(req => req.sender.toString())
        ];

        // 2. Find all pending requests (to avoid suggesting users that already have a pending request)
        const sentPendingRequests = await FriendRequest.find({
            senderId: userId,
            status: "pending"
        }).select('receiverId -_id');
        
        const receivedPendingRequests = await FriendRequest.find({
            receiverId: userId,
            status: "pending"
        }).select('senderId -_id');
        
        // Extract IDs of users with pending requests
        const pendingIds = [
            ...sentPendingRequests.map(req => req.receiver.toString()),
            ...receivedPendingRequests.map(req => req.sender.toString())
        ];
        
        // 3. Find rejected requests (to potentially filter these out)
        const rejectedRequestsIds = await FriendRequest.find({
            $or: [
                { senderId: userId, status: "rejected" },
                { receiverId: userId, status: "rejected" }
            ]
        }).select('senderId receiverId -_id');
        
        // Extract unique IDs from rejected requests
        const rejectedIds = new Set();
        rejectedRequestsIds.forEach(req => {
            const otherUserId = req.sender.toString() === userId 
                ? req.receiver.toString() 
                : req.sender.toString();
            rejectedIds.add(otherUserId);
        });

        // 4. Combine all IDs to exclude from suggestions
        const excludeIds = [
            userId, // Exclude self
            ...friendIds, // Exclude existing friends
            ...pendingIds, // Exclude pending requests
            ...Array.from(rejectedIds) // Exclude rejected requests
        ];

        // 5. Find potential friend suggestions
        const suggestions = await User.find({
            _id: { $nin: excludeIds }
        })
        .select('name email profilePic bio') // Select relevant fields
        .limit(limit);
        
        // 6. Optional: Calculate mutual friends for each suggestion
        const suggestionsWithMutual = await Promise.all(
            suggestions.map(async (suggestion) => {
                // Find friends of the suggestion
                const suggestionSentRequests = await FriendRequest.find({
                    senderId: suggestion._id,
                    status: "accepted"
                }).select('receiverId -_id');
                
                const suggestionReceivedRequests = await FriendRequest.find({
                    receiverId: suggestion._id,
                    status: "accepted"
                }).select('senderId -_id');
                
                // Extract IDs of the suggestion's friends
                const suggestionFriendIds = [
                    ...suggestionSentRequests.map(req => req.receiver.toString()),
                    ...suggestionReceivedRequests.map(req => req.sender.toString())
                ];
                
                // Calculate mutual friends (intersection of friends)
                const mutualFriends = suggestionFriendIds.filter(id => 
                    friendIds.includes(id)
                );
                
                // Return suggestion with mutual friends count
                return {
                    _id: suggestion._id,
                    name: suggestion.name,
                    email: suggestion.email,
                    profilePic: suggestion.profilePic,
                    bio: suggestion.bio,
                    mutualFriends: mutualFriends.length
                };
            })
        );
        
        // 7. Sort suggestions by mutual friends count (descending)
        suggestionsWithMutual.sort((a, b) => b.mutualFriends - a.mutualFriends);

        return {
            status: 200, 
            message: "Friend suggestions fetched successfully", 
            data: suggestionsWithMutual
        };
    }
    catch(error) {
        console.log("Error in FriendRequestSuggestionService:", error);
        return { status: 500, message: "Internal Server Error" };
    }
}

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
    GetfriendRequestService,
    FriendRequestSuggestionService
}