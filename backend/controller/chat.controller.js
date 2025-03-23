import { chatService , CreateNewChatService} from "../service/chat.service.js";
async function chatController(req , res) {
    try{
        const {userId} = req.query;
        console.log("inside chat controller");

        if(!userId) {
            return res.status(400).json({message : "userId is required"});
        }
        const response = await chatService(userId);
        res.status(201).json({data : response , message : "Chat Fetched Successfully"});
    }
    catch(error) {
        res.status(500).json({message : "internal server error in chat Controller"});
    }
}

async function CreateNewChatController(req , res) {
    try{
        const { participants, type } = req.body;    
        if(!participants || !type) {
            return res.status(400).json({message : "participants and type are required"});
        }
        const response = await CreateNewChatService(participants, type);
        res.status(response.statusCode).json(response);
    }
    catch(error) {
        console.log('Error in Create New Chat Controller:', error);
        res.status(500).json({message : "internal server error in chat Controller"});
    }
}


export { chatController , CreateNewChatController};