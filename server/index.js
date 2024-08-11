import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoute.js';
import automationRoute from './routes/automationRoute.js';
import userRoute from './routes/userRoute.js';
import jsonRouteV3 from './experimentals/jsonRouteV3.js';
import geminiRoute from './routes/geminiRoute.js';
import universityRoute from './routes/universityRoute.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB is connected to the app...');
}).catch((err) => {
    console.log(err);
});

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoute);
// this route was used instead of V3 Route
app.use('/api/automation', automationRoute);
app.use('/api/user', userRoute);
// this route was not used during the automation process.
// app.use('/api/automationv3', jsonRouteV3);
app.use('/api/gemini', geminiRoute);
app.use('/api/univs', universityRoute);

const path = 3000;

// create an error handler middleware
// (the 'success' key is used in the frontend);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    }) 
});

app.listen(path, () => {
    console.log(`Server is up and listening on port ${path}`);
});