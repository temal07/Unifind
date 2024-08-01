import express from 'express';
import { signout, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/signout', signout);
router.put('update-user/:userId', updateUser);

export default router;