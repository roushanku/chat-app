import mongoose from 'mongoose';
import User from './user.model.js';
const friendRequestSchema = new mongoose.Schema({
    sender : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
    receiver : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
    status : {type : String, enum : ['pending', 'accepted', 'rejected'], default : 'pending'},
},{
    timestamps : true
});
const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);

export default FriendRequest;