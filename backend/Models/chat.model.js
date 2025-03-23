import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    type : {
        type: String,
        enum: ['private', 'group'],
        default: 'private'
    },
} , { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;

// In this file, we have defined a chatSchema with the following fields:
// participants: An array of user references who are part of the chat
// type: The type of chat (private, group)
// We have also defined a Chat model using the chatSchema and exported it.
// This model will be used to interact with the chats collection
// in the database.