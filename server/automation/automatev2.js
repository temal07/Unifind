import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

export const generateResponse = async () => {
    const fpath = "server/automation/prodtest2.json";
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro'});
    const prompt = `create a list of objects of 100 universities in a JSON format based on the 
            following fields: name, location, gpa, website ranking in global and country,
            tuition, sat_avg, acceptanceRate, scholarship, and website. 
            Keep in mind name and location must be string, gpa must be float, ranking, tuition, acceptanceRate must 
            be Numbers and scholarship must be boolean.
            
            The numbers must be integers (eg 44444 not 44,444) and floats decimals (eg 4.4 not 4.4%)`;
    const result = await model.generateContent(prompt);
    const result_text = await result.response.text();
    const trimmed_result = result_text.trim();
    const formatted_result = trimmed_result.replace(/`/g, '');
    fs.writeFileSync(fpath, formatted_result, 'utf8');
}
/*
its gonna take a decade*/

// Now we have to do this until we reach thousands of unis, right
// what does this mean then?

// but i had made an application with gemini before and i didn't see any character limitations
// like it generated a whole paragraph when i typed something 
//ok 

// lets wait