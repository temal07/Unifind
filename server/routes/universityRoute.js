import express from 'express';
import { getUniversities, getUniversity } from '../controllers/universityController.js';
import { verifyUser } from '../utils/veirfyUser.js';

const router = express.Router();

router.get('/get-univs', verifyUser,  getUniversities);
router.get('/get-university/:universityId', verifyUser, getUniversity);

export default router;