import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoute.js';

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

const path = 3000;

app.listen(path, () => {
    console.log(`Server is up and listening on port ${path}`);
});