
import { Builder, By } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome.js';//i think itll worknow
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import University from '../models/universityModel.js';

// Function to clean Bing API results
export const cleanBingApi = async (uriRequest) => {
    // Set up headless mode options
    const options = new ChromeOptions(); 
    options.addArguments('headless');
    options.addArguments('disable-gpu');
    
    const result = [];
    let driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    try {
        await driver.get(uriRequest);

        let elems = await driver.findElements(By.className('b_algoSlug'));

        for (let elem of elems) {
            let html_of_desc = await elem.getAttribute('innerHTML');
            let elem_modified = html_of_desc.replace(/<span.*?>.*?<\/span>|<strong.*?>.*?<\/strong>/g, '');
            result.push(elem_modified);
        }
    } finally { 
        await driver.quit();
    }

    return result.join('\nNew Data Flow: ');
}

// Function to generate query for the model
export const generateQuery = async (query, field) => {
    //thsi function wouldnt work it is generating multiple datatype but only has data for one
    const initialQuery = `
        Generate the field ${field} data for the university ${query}:
        - Location: Provide the location in the format "City, State, Country".
        - averageGPA: Provide the average GPA as a float.
        - tuition: Provide the tuition cost as a float.
        - satAverage: Provide the SAT average as an integer.
        - acceptanceRate: Provide the acceptance rate as a float.
        - rankingGlobal: Provide the global ranking as an integer.
        - rankingCountry: Provide the country ranking as an integer.
        - scholarship: Indicate whether there is a scholarship (true or false).

        If needed hallucinate a resonable estimate based on your guess.
        NaN types are STRICTLY FORBIDDEN
    `;
    
    const genUrl = `https://www.bing.com/search?q=` + encodeURIComponent(`${query} average ${field}`);
    const data = await cleanBingApi(genUrl);

    return initialQuery + data;
}

// Function to prompt Gemini for the field data
export const promptGemini = async (query, field) => {
    const optimalQuery = await generateQuery(query, field);
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro'});

    const result = await model.generateContent(optimalQuery);
    const result_text = await result.response.text();
    const trimmed_result = result_text.trim();
    const formatted_result = trimmed_result.replace(/`/g, '');
    
    return formatted_result;
}

// Function to iterate over universities and generate field data
export const processUnivs = async (name) => {
    try {
        const location = await promptGemini(name, 'Location');// here, it will call
        const averageGPA = Math.round(parseFloat(await promptGemini(name, 'average GPA')) * 100) / 100; // Rounds to 2 decimal places
        const tuition = Math.round(parseFloat(await promptGemini(name, 'tuition')) * 100) / 100; // Rounds to 2 decimal places
        const satAverage = Math.round(parseInt(await promptGemini(name, 'SAT Average')));
        const acceptanceRate = Math.round(parseFloat(await promptGemini(name, 'acceptance rate')) * 100) / 100; // Rounds to 2 decimal places
        const rankingGlobal = Math.round(parseInt(await promptGemini(name, 'global ranking')));
        const rankingCountry = Math.round(parseInt(await promptGemini(name, 'country ranking')));
        const scholarship = (await promptGemini(name, 'scholarship')) === 'true';

        // Logging the raw values returned by promptGemini
        console.log(`Data for ${name}:`);
        console.log({ location, averageGPA, tuition, satAverage, acceptanceRate, rankingGlobal, rankingCountry, scholarship });

        const university = new University({
            name,
            location,
        });
        await university.save();
        console.log(`Saved ${name} successfully`);
    } catch (error) {
        console.error(`Error processing ${name}:`, error.message);
    }
}

export const iterateUnivs = async () => {
    // Data containing universities of the United States

    const universities = [
        "University at Buffalo SUNY",
        "University of Iowa",
        "Rensselaer Polytechnic Institute",
        "University of Delaware",
        "Oregon State University",
        "University of Georgia",
        "University of Texas Dallas",
        "City University of New York",
        "Lehigh University",
        "University of Nebraska - Lincoln",
        "Florida International University",
        "University of South Florida",
        "University of South Carolina",
        "University of Missouri, Columbia",
        "University of Central Florida",
        "Tulane University",
        "Drexel University",
        "Stevens Institute of Technology",
        "Boston College",
        "University of New Mexico",
        "New Jersey Institute of Technology (NJIT)",
        "The New School",
        "University of Houston",
        "University of Oklahoma",
    ];

    for (let i = 0; i < universities.length; i++) {//
        await processUnivs(universities[i]);
        if (i < universities.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 6000));
        } 
    }
}