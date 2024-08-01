import { errorHandler } from "../utils/errorHandler.js";
import { iterateUnivs } from "../automation/automatev3.js";

export const callGenerativeFunction = async (req, res, next) => {
    try {
        iterateUnivs();
        res.status(201).json({
            message: 'Data created successfully',
        });
    } catch (error) {
        next(errorHandler(error.statusCode, error.message));
    }
}
