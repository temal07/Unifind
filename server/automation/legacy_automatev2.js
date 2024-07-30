/*import { Builder, Browser, By, Key, until } from 'selenium-webdriver'
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

const result = []; // Removable
let optimalQuery; // Removable

export const cleanBingApi = async (uriRequest) => {
    // Fetches only descriptive parts from bing in array result
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get(uriRequest);

    let elems = await driver.findElements(By.className('b_algoSlug'));

    elems.forEach(elem => {
        let html_of_desc = elem.getAttribute('innerHTML');
        let elem_modified = html_of_desc.replace(/<span>(.*?)<\/strong>/g, '');

        result.push(elem_modified);
    });
    
    await driver.quit();
    
    return result.join('\nNew Data Flow: ');
}


export const generateQuery = async (query, field) => {
    // Return a website prompt part based on query and field
    const optimalQuery = `Generate an average ${field} for the university ${query} which should be a strict integer/float based on the following data: `;
    
    const genUrl = `https://www.bing.com/search?q=` + encodeURIComponent(`${query} average ${field}`);
    cleanBingApi(genUrl)
        .then((result => {
            const optimalQuery = optimalQuery.concat(result);
        }));
    
    return optimalQuery;
}

// let single_university_field_data;

export const promptGemini = async (query, field) => {
    // Prompts gemini for field from univ

    generateQuery(query, field)
        .then((result) => {
            const optimalQuery = result;
        })

    const fpath = 'server/automation/data/unis.json';
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro'});

    const result = await model.generateContent(optimalQuery);
    const result_text = await result.response.text();
    const trimmed_result = result_text.trim();
    
    const formatted_result = trimmed_result.replace(/`/g, '');
    
    return formatted_result;
}

export const iterateUnivs = async (field) => {
    // Iterate+generate for the bulk of universities
    const fpath_input = 'server/automation/data/unis2.json'; // 2 = ltd. ver
    const fpath_output = 'server/automation/data/unis3.json';
    
    const parse_json = JSON.parse(fs.readFileSync(fpath_input, 'utf8'));

    for (let item of parse_json) {
        promptGemini(item.name, field)
            .then((result)=>{
                item[field] = result
            });
    };

    // last error: returned what we wrote in unis2 json unmodified

    const stringifiedUnivData = JSON.stringify(parse_json);
    fs.writeFileSync(fpath_output, stringifiedUnivData, 'utf8');
}*/
// i literally just asked chat gpt to revise
// ye?💀💀💀

//  yo mayank something crazy happened
// it opened bing and showed me the MIT accpetance rate
// wait 