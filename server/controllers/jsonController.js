import { generateResponse } from "../automation/legacy_automate.js";
import { errorHandler } from "../utils/errorHandler.js";
import { iterateUnivs } from "../automation/automatev2.js";

export const callGenerativeFunction = async (req, res, next) => {
    try {
        const searchedFields = [
            'GPA', 
            'Tuition', 
            'Global Ranking', 
            'Country Ranking',
            'Acceptance Rate',
        ]
        for (let i = 0; i < searchedFields.length; i++) {
            iterateUnivs(searchedFields[i]);
        }
        res.status(201).json({
            message: 'Data created successfully.'
        });
    } catch (error) {
        next(errorHandler(error.statusCode, error.message));
    }
}
