/*handles /api/auth/signin, /api/auth/signup by using functions in auth controller*/
import express from 'express';
import { signup, signin, google } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', signin);
router.post('/google', google);

export default router;