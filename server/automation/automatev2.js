
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
    const universities = [
        "University College London",
        "Eidgenössische Technische Hochschule Zürich",
        "University of Edinburgh",
        "The London School of Economics and Political Science",
        "Katholieke Universiteit Leuven",
        "Ludwig-Maximilians-Universität München",
        "University of Manchester",
        "University of Southampton",
        "University of Glasgow",
        "Imperial College London",
        "Universität Wien",
        "Helsingin yliopisto",
        "Freie Universität Berlin",
        "Universiteit Utrecht",
        "Ruprecht-Karls-Universität Heidelberg",
        "Technische Universität München",
        "University of Birmingham",
        "Universiteit Leiden",
        "Universitetet i Oslo",
        "University of Warwick",
        "Universiteit van Amsterdam",
        "Technische Universiteit Delft",
        "Københavns Universitet",
        "Friedrich-Alexander-Universität Erlangen-Nürnberg",
        "École Polytechnique Fédérale de Lausanne",
        "King's College London",
        "Rijksuniversiteit Groningen",
        "University of Leeds",
        "Universidad de Barcelona",
        "Alma Mater Studiorum Università di Bologna",
        "Masarykova univerzita",
        "Ruhr-Universität Bochum",
        "Universiteit Gent",
        "Universidad Complutense de Madrid",
        "Technische Universität Berlin",
        "Univerzita Karlova",
        "Newcastle University",
        "Norges teknisk-naturvitenskaplige universitet",
        "Humboldt-Universität zu Berlin",
        "University of Liverpool",
        "Technische Universität Wien",
        "Universität Hamburg",
        "Lunds Universitet",
        "Rheinisch-Westfälische Technische Hochschule Aachen",
        "Université de Genève",
        "Universität Zürich",
        "Uppsala Universitet",
        "Goethe-Universität Frankfurt am Main",
        "University of Nottingham",
        "The University of York",
        "Tampereen yliopisto",
        "Technische Universität Dresden",
        "Rheinische Friedrich-Wilhelms-Universität Bonn",
        "Kungliga Tekniska högskolan",
        "Lancaster University",
        "University of St Andrews",
        "Universität zu Köln",
        "University of Exeter",
        "Durham University",
        "Aarhus Universitet",
        "Eberhard Karls Universität Tübingen",
        "Trinity College Dublin, University of Dublin",
        "Université de Strasbourg",
        "Karlsruher Institut für Technologie",
        "Linköpings Universitet",
        "Moscow State University",
        "Université de Liège",
        "Westfälische Wilhelms-Universität Münster",
        "Universität Leipzig",
        "Queen Mary University of London",
        "Vrije Universiteit Amsterdam",
        "Universidad Autónoma de Barcelona",
        "Universidad de Valencia",
        "Universidad de Granada",
        "Aalto-yliopisto",
        "Universität Bern",
        "Wageningen Universiteit",
        "Universiteit Twente",
        "Universitetet i Bergen",
        "Georg-August-Universität Göttingen",
        "Albert-Ludwigs-Universität Freiburg",
        "University of Sheffield",
        "Université de Paris",
        "Universidade de Lisboa",
        "Université Catholique de Louvain",
        "Universidad Politécnica de Madrid",
        "University of Bath",
        "Göteborgs universitet",
        "Università degli Studi di Padova",
        "Universidad Politécnica de Cataluña",
        "Technische Universiteit Eindhoven",
        "Johannes Gutenberg-Universität Mainz",
        "University of Bristol",
        "Université de Lille",
        "Universidad del País Vasco",
        "Universität Stuttgart",
        "Universidade do Porto",
        "National Research University Higher School of Economics"
    ];

    for (let i = 0; i < universities.length; i++) {//
        await processUnivs(universities[i]);
        if (i < universities.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 6000));
        } 
    }
}