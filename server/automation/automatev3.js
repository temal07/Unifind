/*
@title         UniversityDataAutomator
@description   Automatically generates data field for universities
@version       3.0.0
@last-modified 7/31/2024 8:28PM EST
@history       As described below:
               V1:
                   Simple data generation, field by field (1 field capable in 1 prompt) or hallucinated (entire dataset capable in 1 prompt)
                   Exported to JSON schema
               V2:
                   Generation for various fields through an iterative process (7 fields in 7 prompts)
                   Exported to JSON Schema
               V3:
                   Generation of various fields at once (7 fields in 1 prompt)
                   Designated controllers, models, and routes
                   Exported to MongoDB Schema
*/

import { Builder, By } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome.js';//i think itll worknow
import { GoogleGenerativeAI } from '@google/generative-ai';
import { universities } from './data/usUnivs.js';
import fs from 'fs';
import University2 from '../experimentals/jsonModelV3.js';
// Function to clean Bing API results
export const cleanBingApi = async (uriRequest, field) => {
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

    return result.join(`\nNew Data Flow [ Research for field ${field} ]: `);
}

// Function to generate query for the model
export const generateQuery = async (query) => {
    //thsi function wouldnt work it is generating multiple datatype but only has data for one
    const initialQuery = `
        Generate all the fields data for the university ${query}:
        - Location: Provide the location in the format "City, State, Country".
        - averageGPA: Provide the average GPA as a float.
        - tuition: Provide the tuition cost as a float.
        - satAverage: Provide the SAT average as an integer.
        - acceptanceRate: Provide the acceptance rate as a float.
        - rankingGlobal: Provide the global ranking as an integer.
        - rankingCountry: Provide the country ranking as an integer.
        - scholarship: Indicate whether there is a scholarship (true or false).
        Filetype instructions
            Return like this: Location,averageGPA,tuition,satAverage,ac...
            E.g. Ithaca-NY-USA,3.69,94524,1420,69,99,9,true
            Must be in CSV format
        Validity Instructions
            If needed hallucinate a resonable estimate based on your guess.
            NaN types are STRICTLY FORBIDDEN
            
        Note: TAKE YOUR TIME BUT BE ACCURATE
    `;

    const universityFields = [
    "Location",
    "averageGPA",
    "tuition",
    "satAverage",
    "acceptanceRate",
    "rankingGlobal",
    "rankingCountry",
    "scholarship"
    ];      

    const queryData = '';
    universityFields.forEach(async (field) => {
        queryData + 
            await cleanBingApi(
                `https://www.bing.com/search?q=${encodeURIComponent(`${query} average ${field}`)}`,
                field
            );
    });

    const finalQuery = initialQuery + '\n Here is the data provided for research as follows: \n' + queryData;
    return finalQuery;
}

// MongoDB Import Specific Function
async function insertUniversity(csvString) {
    // Parse the CSV string
    const [location, averageGPA, tuition, satAverage, acceptanceRate, rankingGlobal, rankingCountry, scholarship] = csvString.split(',');

    // Create a new University document
    const newUniversity = new University2({
        csv_university: location.split('-')[0], // Assuming the university name is the first part of the location
        location: location,
        averageGPA: parseFloat(averageGPA),
        tuition: parseFloat(tuition),
        satAverage: parseInt(satAverage),
        acceptanceRate: parseFloat(acceptanceRate),
        rankingGlobal: parseInt(rankingGlobal),
        rankingCountry: parseInt(rankingCountry),
        scholarship: scholarship.toLowerCase() === 'true'
    });

    try {
    // Save the document to the database
    const savedUniversity = await newUniversity.save();
    console.log('University saved successfully:', savedUniversity);
    return savedUniversity;
    } catch (error) {
    console.error('Error saving university:', error);
    }
}


// Function to iterate over universities and generate field data
export const processUnivs = async (name) => {
    const allCsv = await promptGemini(name);

    // CSV Generation
    fs.writeFile('server/automation/data/usUnivsGen2.csv', allCsv+'\n');
    
    // MongoDB Generation
    insertUniversity(allCsv);

}

// Function to prompt Gemini for the field data
export const promptGemini = async (query) => {
    const optimalQuery = await generateQuery(query);
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro'});

    const result = await model.generateContent(optimalQuery);
    const result_text = result.response.text();
    const trimmed_result = result_text.trim();
    const formatted_result = trimmed_result.replace(/`/g, '');
    
    return formatted_result;
}

export const iterateUnivs = async () => {

    for (let i = 0; i < universities.length; i++) {
        await processUnivs(universities[i])

        if (i < universities.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 6000));
        }
    }
}