import { errorHandler } from "../utils/errorHandler.js";
import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';

export const signout = async (req, res, next) => {
    try {
        // clear the access token we had generated 
        // in signin and signup routes
        res.clearCookie('access_token').status(200).json({
            message : 'User has been signed out successfuly'
        });
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    // Specific requirements must be met in order for the
    // person to update their profile

    console.log(req.body);

    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this user.'));
    } 
    if (req.body.password) {
        if (req.body.password.length < 7) {
            return next(errorHandler(
                400, 
                'The password must at least be 8 characters long'
            ));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username > 14) {
            return next(errorHandler(
                400, 
                'The username should be between 7 and 14 characters long.'
            ));
        } 
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'The username cannot contain spaces.'));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, 'The username must be all lowercase'));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, 
                'The username can only contain letters and numbers'
            ));
        }
    }

    // try to save the updated user to the databse

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                    "academicSituation.satScore": req.body.sat,
                    "academicSituation.actScore": req.body.act,
                    "academicSituation.gpa": req.body.gpa,
                    "academicSituation.extraCurriculars": req.body.extraCurriculars,
                    "interests.hobbies": req.body.hobbies,
                    "basicInfo.residency": req.body.residency,
                    "basicInfo.currentGrade": req.body.currentGrade,
                    "basicInfo.financialSituation": req.body.financialSituation,
                    "basicInfo.description": req.body.description,
                    "dreamtUnis": req.body.dreamtUnis,
                },
            },
            { new: true }
        )
        // exclude the password when the JSON is sent when the user is updated
        // because attackers might see the password.
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(errorHandler(error.statusCode, error.message));
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this user.'));
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('User has successfully been deleted');
    } catch (error) {
        next(errorHandler(error.statusCode, error.message));       
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return next(errorHandler(404, 'User not found.'));
        }
        // exclude the password when the JSON is sent when the user is updated
        // because attackers might see the password.
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        return next(errorHandler(error.statusCode, error.message));
    }
}   

export const getUsers = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 7;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;

        const query = {};

        if (req.query.searchTerm) {
            query.$or = [
                { name: { $regex: req.query.searchTerm, $options: 'i' } },
                { username: { $regex: req.query.searchTerm, $options: 'i' } },
            ];
        }

        const users = await User.find(query)
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit);

        const usersWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
        });

        // Total users matching the search query
        const totalUsers = await User.countDocuments(query);

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        // Users created in the last month matching the search query
        const lastMonthUsers = await User.countDocuments({
            ...query,
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
            users: usersWithoutPassword,
            totalUsers,
            lastMonthUsers,
        });
    } catch (error) {
        next(errorHandler(error.statusCode, error.message));
    }
}
