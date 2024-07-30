import { Builder, By } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome.js';//i think itll worknow
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

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
            // idea: data automation with Ai company
            // idk 
            // i think i have yt link 

            // copy it here
            
            // what are we automating tho
            // itmust be something that needs automation

            // we could def make a company in those fields

            // https://www.youtube.com/results?search_query=use+ai+to+automate+data+entry tons of videos
            // yo mayank i was thinking maybe this idea that we have can expand in the future
            // maybe turn into a startup

            // we must wrtie the idea in a clear written state
            // ye ofc and we can fund it on kickstarter, i think people would fund this
            // idea: Automated Data Entry With AI (Autofy)
            // yo wait lets delete this rpoject and create  a new one

            // i mean if we cant make it on time (aug 12), at least we can expand the website and stuff
            // lets create a new txt file
            // 
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
    const initialQuery = `Generate an average ${field} for the university ${query} which should be a strict integer/float based on the following data (if needed, hallucinate a reasonable estimate for the university based on a guess - it doesn't have to be accurate, just guess, but precede the hallucination with <HALLUCINATION> e.x. <HALLUCINATION> 4.0): `;
    
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
export const iterateUnivs = async (field) => {
    const fpath_input = 'server/automation/data/unis3.json'; 
    const fpath_output = 'server/automation/data/unis3.json';
    
    const parse_json = JSON.parse(fs.readFileSync(fpath_input, 'utf8'));

    for (let item of parse_json) {
        item[field] = await promptGemini(item.name, field);
    }

    const stringifiedUnivData = JSON.stringify(parse_json, null, 2);
    fs.writeFileSync(fpath_output, stringifiedUnivData, 'utf8');
}