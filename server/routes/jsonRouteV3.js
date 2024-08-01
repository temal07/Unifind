import express from 'express';
import { callGenerativeFunction } from '../controllers/jsonControllerV3.js';

const router = express.Router();

router.post('/experimental', callGenerativeFunction);

export default router;