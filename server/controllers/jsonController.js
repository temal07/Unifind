import { generateResponse } from "../automation/automatev2.js";
import { errorHandler } from "../utils/errorHandler.js";

export const callGenerativeFunction = async (req, res, next) => {
    try {
        generateResponse();
        res.status(201).json({
            message: 'Data created successfully.'
        })//try giving json in messa
    } catch (error) {
        next(errorHandler(error.statusCode, error.message));
    }
}

// i got an error wait thats a good sign