import jwt from 'jsonwebtoken';
import { errorHandler } from './errorHandler.js';

export const verifyUser  = async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }

    jwt.verify(toekn, process.env.JWT_TOKEN, (err, user) => {
        if (err) {
            return next(errorHandler(401, 'Unauthorized'));
        }

        req.user = user;
        next();
    });
}