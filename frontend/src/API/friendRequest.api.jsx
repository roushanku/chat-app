import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendURl= "http://localhost:5000";
async function friendRequestSuggestion(userId) {
    try{
        console.log("backendURl :" , backendURl);
        const response = await axios.get(`${backendURl}/api/v1/friendRequest/suggestion?userId=${userId}`, {
            withCredentials: true,
        });
        
        console.log("response from friendRequestSuggestion" , response);
        return response;
    }
    catch(error) {
        console.error("Error fetching friend request suggestions:", error);
        toast.error(error.response?.data?.message || "Failed to fetch friend request suggestions.");
    }
}

export { friendRequestSuggestion };