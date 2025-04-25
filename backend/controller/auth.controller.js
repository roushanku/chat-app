import {GetUserDetailsService, RegisterUserService} from "../service/auth.service.js";
import {LoginUserService , UserLogoutService} from '../service/auth.service.js';
import { updateProfilePictureService } from "../service/auth.service.js";
async function RegisterUserController(req , res) {
    try{
        // console.log("debug RegisterUserController");
        const { name, email, password, phoneNumber, profile_picture } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({message: 'Please fill all the fields'});
        }
        
        // console.log(name, email, password, phoneNumber, profile_picture);
        const result = await RegisterUserService(name, email, password, phoneNumber, profile_picture);

        if (result?.error) {
            return res.status(400).json({ message: result.error });
        }

        // console.log(result);
        res.status(200).json({ data: result, message: 'User Registered successfully' });
    }
    catch(error) {
        res.status(500).json({message: 'Internal Server Error in Register User controller'});
        console.log("error in Register User Controller", error);
    }
}


async function LoginUserController(req , res) {
    try{
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const result = await LoginUserService(email, password);

        if (result?.error) {
            return res.status(400).json({ message: result.error });
        }

        return res.status(200).json({ data: result, message: 'User Logged in successfully' });
    }
    catch(error) {
        res.status(500).json({message: 'Internal Server Error in Login User controller'});
    }
}

async function UserLogoutController(req , res) {
    try{
        const response = await UserLogoutService(req , res);
        if (response?.error) {
            return res.status(400).json({ message: response.error });
        }
        return res.status(200).json({ message: 'User Logged out successfully' });
    }
    catch(error) {
        res.status(500).json({message: 'Internal Server Error in Logout User controller'});
    }
}

async function getUserDetailsController(req , res) {
    try{
        const {userId} = req.query;
        const response = await GetUserDetailsService(userId);
        if (response?.error) {
            return res.status(400).json({ message: response.error });
        }
        return res.status(200).json({ data : response , message: 'details fethced successfully..' });
    }
    catch(error) {
        res.status(500).json({message: 'Internal Server Error in Get User Details controller'});
    }
}

async function profilePictureController(req , res) {
    try{
        const {userId , file} = req.body;
        if(!file) {
            return res.status(400).json({message: "Please provide a file"});
        }

        const response = await updateProfilePictureService(req , res);
        if(response.status === 200) {
            return res.status(200).json({message: response.message, data: response.data});
        }
        else {
            return res.status(500).json({message: response.message});
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export {RegisterUserController , LoginUserController , UserLogoutController , getUserDetailsController , profilePictureController};