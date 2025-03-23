import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chat_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    sender_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content : {
        type: String,
        required: [true, 'Content is required']
    },
    read_by : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    type : {
        type: String,
        enum: ['text', 'image', 'video'],
        default: 'text'
    }
} , { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;


// In this file, we have defined a messageSchema with the following fields:
// chat_id: A reference to the chat to which the message belongs
// sender_id: A reference to the user who sent the message
// content: The content of the message
// read_by: An array of user references who have read the message
// type: The type of message (text, image, video)
// We have also defined a Message model using the messageSchema and exported it.
// This model will be used to interact with the messages collection in the database.