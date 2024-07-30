import { Builder, Browser, By, Key, until } from 'selenium-webdriver'
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

export const generateResponse = async () => {
    const fpath = "server/automation/prodtest3.json";
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro'});
    const prompt = `create a list of objects of 100 universities in a JSON format based on the 
            following fields: name, location, gpa, website ranking in global and country,
            tuition, sat_avg, acceptanceRate, scholarship, and website. 
            Keep in mind name and location must be string, gpa must be float, ranking, tuition, acceptanceRate must 
            be Numbers and scholarship must be boolean. Also keep in mind that acceptanceRate, gpa, 
            ranking in global, scholarship, tuition and sat average fields must have a sub field 
            called source which indicates where you get that information from. 
            The source must be a website
            
            The numbers must be integers (eg 44444 not 44,444) and floats decimals (eg 4.4 not 4.4%)`;
    const result = await model.generateContent(prompt);
    const result_text = await result.response.text();
    const trimmed_result = result_text.trim();
    const formatted_result = trimmed_result.replace(/`/g, '');
    fs.writeFileSync(fpath, formatted_result, 'utf8');
}