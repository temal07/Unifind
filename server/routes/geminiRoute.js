import express from 'express';
import { generativeGeminiAI } from '../controllers/geminiController.js';

const gemini_router = express.Router();

gemini_router.post('/generate-res', generativeGeminiAI);

export default gemini_router;