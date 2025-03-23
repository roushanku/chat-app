import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\d{10}$/, 'Phone number must be between 10 digits']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    profile_picture: {
        type: String,
        default: 'https://res.cloudinary.com/dxkufsejm/image/upload/v1633341159/blank-profile-picture-973460_640_1_a2zj4k.png',
    },
    last_seen: {
        type: Date,
        default: Date.now
    },
    isOnline: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;


// In this file, we have defined a userSchema with the following fields:
// name: The name of the user
// email: The email address of the user
// phoneNumber: The phone number of the user
// password: The password of the user
// profile_picture: The profile picture of the user
// last_seen: The last seen timestamp of the user
// isOnline: A boolean flag to indicate whether the user is online or not