import GeminiResponse from "../models/geminiModel.js";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { errorHandler } from "../utils/errorHandler.js";


export const generativeGeminiAI = async (req, res, next) => {
    const { gpa, sat, financialSituation, extraCurriculars, act, interests } = req.body;

    if (
        !gpa || 
        gpa === "" || 
        !sat || 
        sat === "" || 
        !financialSituation ||
        financialSituation === "" ||
        !extraCurriculars ||
        extraCurriculars === "" ||
        !act ||
        act === "" ||
        !interests ||
        interests === ""
    ) {
        return next(errorHandler(400, 'Please enter all your academic and financial status!'));        
    }

    const prompt = `
        Based on a student who has a ${financialSituation} income status, a ${gpa}
        GPA, a ${sat} SAT, a ${act} ACT, the following extracurriculars: 
        ${extraCurriculars}, and is interested in ${interests}, 
        recommend some universities that this student
        might want to apply to. Add a short and a logical reason to why they might want to 
        apply to these universities. Include the porgrams offered at those universities that 
        align with the student's interests.
    `

    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    try {
        
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