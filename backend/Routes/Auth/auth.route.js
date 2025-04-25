import express from 'express';
import {RegisterUserController , LoginUserController, UserLogoutController, getUserDetailsController, profilePictureController} from '../../controller/auth.controller.js';

const AuthRouter = express.Router();

AuthRouter.post('/register' , RegisterUserController);
AuthRouter.post('/login' , LoginUserController);
AuthRouter.post('/logout' , UserLogoutController);
AuthRouter.get('/getUserdetails' , getUserDetailsController);
AuthRouter.post('/updateProfilePicture' , profilePictureController);
export default AuthRouter;