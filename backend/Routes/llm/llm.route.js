import express from 'express';
import { handleCaptionGeneration, handleTranslation } from '../../controller/llm.controller.js';

const llmRouter = express.Router();

llmRouter.post('/translate' , handleTranslation);
llmRouter.post('/caption' , handleCaptionGeneration);

export default llmRouter