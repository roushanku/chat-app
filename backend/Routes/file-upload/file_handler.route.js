import express from 'express';
import { handleFileUploadController } from '../../controller/file_handler.controller.js';

const FileHandlerRouter = express.Router();

FileHandlerRouter.post('/upload', handleFileUploadController);

export default FileHandlerRouter;