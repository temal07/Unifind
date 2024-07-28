/* Populates the json file */
import fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro'});

const filePath = '../../unis.json';
const outputFilePath = 'unis.prodtest.json';

const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const  GenerateUWGPAReports = (_data) {
    if (Array.isArray(_data)) {
        _data.forEach(item => {
            try {
                const prompt = `Generate a plausible UWGPA for a student from the institution named '${item.name}' on a 4.0 scale.`;
                const result = await model.generateContent(prompt);
                const uwgpa = await result.response.text();
                const uwgpa = uwgpa.trim();
                _data.push(uwgpa);
            } catch (error) {
                console.log('sus');
            }
        });
    }
    return 
}