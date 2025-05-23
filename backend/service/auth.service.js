import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../Models/user.model.js'
import { handleFileUploadController } from '../controller/file_handler.controller.js';
async function RegisterUserService(name , email , password , phoneNumber , profile_picture) {
    try{
        const userExists = await User.findOne({ email }).exec();

        if (userExists) {
            return { error: 'User already exists' };
        }

        const encryptedPassword = await bcrypt.hash(password , 12);

        const profile_picture_url = await handleFileUploadController(profile_picture).data.url; //handle uploading to cloudnary

        const user = new User ({
            name : name,
            email : email,
            password: encryptedPassword,
            phoneNumber : phoneNumber,
            profile_picture : profile_picture_url,
        });

        const result = await user.save();
        return result;
    }
    catch(error) {
        console.log('Error in Register User Service:', error);
        return { error: 'Internal Server Error in Register User Service' };
    }   
}


async function LoginUserService(email , password) {
    try{
        const user = await User.findOne({ email }).exec();

        if (!user) {
            return { error: 'User not found' };
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return { error: 'Invalid Password' };
        }

        const token = jwt.sign({ email: user.email, id: user._id }, 'token', { expiresIn: '1h' });

        return { user, token };
    }
    catch(error) {
        console.log('Error in Login User Service:', error);
        return { error: 'Internal Server Error in Login User Service' };
    }
}

async function UserLogoutService(req , res) {
    try{
        res.clearCookie('token');
        console.log("logout successfull");
        return { message: 'User Logged out successfully' };
    }
    catch(error) {
        console.log('Error in Logout User Service:', error);
        return { error: 'Internal Server Error in Logout User Service' };
    }
}

async function GetUserDetailsService(userId) {
    try{
        // console.log("debug GetUserDetailsService");
        // console.log(userId);
        const user = await User.findById(userId).exec();
        // console.log(user);
        if (!user) {
            return { error: 'User not found' };
        }
        return user;
    }
    catch(error) {
        console.log('Error in GetUserDetailsService:', error);
        return { error: 'Internal Server Error in GetUserDetailsService' };
    }
}

async function updateProfilePictureService(userId, profile_picture) {
    try {
        const profile_picture_url = await handleFileUploadController(req , res).data.url; //handle uploading to cloudnary

        const user = await User.findByIdAndUpdate(userId, { profile_picture: profile_picture_url }, { new: true }).exec();

        if (!user) {
            return { error: 'User not found' };
        }

        return { message: 'Profile picture updated successfully', data: user };
    } catch (error) {
        console.log('Error in Update Profile Picture Service:', error);
        return { error: 'Internal Server Error in Update Profile Picture Service' };
    }
}

export { RegisterUserService, LoginUserService , UserLogoutService , GetUserDetailsService , updateProfilePictureService };