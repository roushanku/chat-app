import Chat from "../Models/chat.model.js";
import Message from "../Models/message.model.js";
import { getReceiverSocket } from "../socketIO/server.js";
import { io } from "../socketIO/server.js";

async function SaveMessageService(chat_id, sender_id, content, type) {
    try{
        const message = new Message({chat_id, sender_id, content, type});
        const savedMessage = await message.save();
        
        // Find chat to get participants
        const chat = await Chat.findById(chat_id);
        
        if (!chat) {
            throw new Error("Chat not found");
        }
        
        // Find the receiver (the participant who is not the sender)
        const receiverId = chat.participants.find(
            participant => participant.toString() !== sender_id.toString()
        );
        
        if (receiverId) {
            const receiverSocketId = getReceiverSocket(receiverId.toString());
            console.log("Receiver socket ID:", receiverSocketId);
            
            if (receiverSocketId) {
                // Emit to specific user socket
                io.to(receiverSocketId).emit('getnewMessage', savedMessage);
            }
            
            // Also emit to the chat room
            io.to(chat_id).emit('getnewMessage', savedMessage);
        }

        console.log("Message saved successfully:", savedMessage);
        
        return savedMessage;
    }
    catch(error) {
        console.log('Error in Save Message Service:', error);
        return { error: 'Internal Server Error in Save Message Service' };
    }
}

async function fetchMessageService(chat_id) {
    try{
        const message = await Message.find({chat_id}).sort({createdAt: 1});
        return message;
    }
    catch(error) {
        console.log('Error in fetch Message Service:', error);
        return { error: 'Internal Server Error in fetch Message Service' };
    }
}

export { SaveMessageService, fetchMessageService };