import Message from "../Models/message.model.js";

async function SaveMessageService(chat_id, sender_id, content, type) {
    try{
        const message = new Message({chat_id , sender_id , content , type});
        const response = await message.save();
        return response;
    }
    catch(error) {
        console.log('Error in Save Message Service:', error);
        return { error: 'Internal Server Error in Save Message Service' };
    }
}

async function fetchMessageService(chat_id) {
    try{
        const message = await Message.find({chat_id}).sort({createdAt : 1});
        return message;
    }
    catch(error) {
        console.log('Error in fetch Message Service:', error);
        return { error: 'Internal Server Error in fetch Message Service' };
    }
}
export { SaveMessageService , fetchMessageService};