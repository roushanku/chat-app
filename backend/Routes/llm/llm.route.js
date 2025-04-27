import express from 'express';
import { handleCaptionGeneration, handleTranslation } from '../../controller/llm.controller.js';
import { handleAudioTranscription } from '../../controller/audioProcessing.controller.js';

const llmRouter = express.Router();

llmRouter.post('/translate' , handleTranslation);
llmRouter.post('/caption' , handleCaptionGeneration);
llmRouter.post('/transcribe' , handleAudioTranscription);

export default llmRouter