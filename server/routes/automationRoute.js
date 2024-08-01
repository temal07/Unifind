import express from 'express';
import { callGenerativeFunction } from '../controllers/jsonController.js'

const router = express.Router();

router.post('/auto', callGenerativeFunction);

export default router;
