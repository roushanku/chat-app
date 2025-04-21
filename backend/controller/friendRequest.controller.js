import { AcceptfriendRequestService, GetfriendRequestService, RejectfriendRequestService, SendfriendRequestService } from "../service/friendRequest.service.js";

async function SendfriendRequestController(req , res) {
    try{
        const { senderId, receiverId } = req.body;
        if(!senderId || !receiverId) {
            return res.status(400).json({message: "Please provide senderId and receiverId"});
        }
        
        const response = await SendfriendRequestService(senderId , receiverId);
        if(response.status === 200) {
            return res.status(200).json({message: response.message, data: response.data});
        }
        else {
            return res.status(500).json({message: response.message});
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

async function AcceptfriendRequestController(req , res) {
    try{
        const { senderId, receiverId } = req.body;
        if(!senderId || !receiverId) {
            return res.status(400).json({message: "Please provide senderId and receiverId"});
        }
        const response = await AcceptfriendRequestService(senderId , receiverId);
        if(response.status === 200) {
            return res.status(200).json({message: response.message, data: response.data});
        }
        else {
            return res.status(500).json({message: response.message});
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

async function RejectfriendRequestController(req , res) {
    try{
        const { senderId, receiverId } = req.body;
        if(!senderId || !receiverId) {
            return res.status(400).json({message: "Please provide senderId and receiverId"});
        }
        const response = await RejectfriendRequestService(senderId , receiverId);
        if(response.status === 200) {
            return res.status(200).json({message: response.message, data: response.data});
        }
        else {
            return res.status(500).json({message: response.message});
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }   
}

async function GetfriendRequestController(req , res) {
    try{
        const { userId } = req.body;
        if(!userId) {
            return res.status(400).json({message: "Please provide userId"});
        }
        const response = await GetfriendRequestService(userId);
        if(response.status === 200) {
            return res.status(200).json({message: response.message, data: response.data});
        }
        else {
            return res.status(500).json({message: response.message});
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export {
    SendfriendRequestController,
    AcceptfriendRequestController,
    RejectfriendRequestController,
    GetfriendRequestController
}