import GeminiResponse from "../models/geminiModel.js";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { errorHandler } from "../utils/errorHandler.js";

// yo mayank btw the gemini will function if you give it 
// the prompt. To give it, Postman is a great option. 
// no postman is an application for hhttp requests. 
// Like instead of going to google and giving it the prompt, you
// use postman to handle http requests

// i'm confu

export const generativeGeminiAI = async (req, res, next) => {
    const { prompt } = req.body;

    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    try {
        if (!prompt || prompt === "") {
            return next(errorHandler(400, 'Please enter a prompt'));
        }
        
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        return res.status(200).json({ message: text });

    } catch (error) {
        next(errorHandler(error.statusCode, error.message));
    }
}