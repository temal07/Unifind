import express from 'express';
import { callGenerativeFunction } from '../controllers/jsonController.js'

const router = express.Router();

router.post('/auto', callGenerativeFunction);

// ok im testing

export default router;

// bro we forgot to export the router// i forgot 