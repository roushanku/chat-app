import { SaveMessageService , fetchMessageService} from '../service/message.service.js';
async function SaveMessageController(req , res) {
    try{
        const { chat_id, sender_id, content, type } = req.body;

        if(!chat_id || !sender_id || !content || !type) {
            return res.status(400).json({message : "chat_id , sender_id , content and type are required"});
        }
        const response = await SaveMessageService(chat_id, sender_id, content, type);
        res.status(201).json(response);
    }
    catch(error) {
        res.status(500).json({message : "internal server error in chat Controller"});
    }
}

async function fetchMessageController(req , res) {
    try{
        const { chat_id } = req.query;
        const message = await fetchMessageService(chat_id);
        res.status(200).json(message);
    }
    catch(error) {
        res.status(500).json({message : "internal server error in chat Controller"});
    }
}

export { SaveMessageController , fetchMessageController};