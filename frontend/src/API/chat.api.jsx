import axios from "axios";
import { toast } from "react-toastify";


const backendUrl = "http://localhost:5000";

async function getChats(userId) {
    try{
        // const response = await axios.get(`http://localhost:5000/api/v1/chat/getAllconversation?userId=67d00ca99a2f2835effad3a8`);
        const response = await axios.get(`${backendUrl}/api/v1/chat/getAllconversation?userId=${userId}`, {
            withCredentials: true,
        });
        console.log("response from getChats" , response.data);

        return response;

    }
    catch(error) {
        toast.error(error.response?.data?.message || "Failed to get chats.");
    }
}

async function getMessage(chatId) {
    try{
        const response = await axios.get(`${backendUrl}/api/v1/message/getMessage/?chat_id=${chatId}`, {
            withCredentials: true,
        });
        return response;
    }
    catch(error) {
        toast.error(error.response?.data?.message || "Failed to get messages.");
    }
}

async function newChat(participants , type) {
    try{
        const response = await axios.post(`${backendUrl}/api/v1/chat/newChat`, {
            participants,
            type
        }, {
            withCredentials: true,
        });
        return response;
    }
    catch(error) {
        toast.error(error.response?.data?.message || "Failed to create new chat.");
    }
}

async function sendMessage(chatId , sender_id , content , type) {
    try{
        const response = await axios.post(`${backendUrl}/api/v1/message/saveMessage`,{
            chat_id : chatId,
            sender_id,
            content,
            type
        },{
            withCredentials: true,
        })

        return response;
    }
    catch(error) {
        toast.error(error.response?.data?.message || "Failed to send message");
    }
}

export { getChats , getMessage , newChat , sendMessage };