import chatModel from '../Models/chat.model.js';
async function chatService(userId) {
    try{

        const response = await chatModel.find({participants : userId}).exec();
        console.log("response from chat service" , response);
        return response;
    }
    catch(error) {
        return error;
    }
}

async function CreateNewChatService(participants, type) {
    try {
        const isExistChat = await chatModel.findOne({ participants }).exec();

        if (isExistChat) {
            return {
                statusCode: 200,  // OK: Chat exists
                data: isExistChat,
                message: "Chat already exists",
            };
        }

        const chat = new chatModel({ participants, type });
        const response = await chat.save();

        return {
            statusCode: 201,  // Created: New chat was created
            data: response,
            message: "Chat created successfully",
        };
    } catch (error) {
        return {
            statusCode: 500,
            message: error.message,
        };
    }
}


export { chatService , CreateNewChatService };