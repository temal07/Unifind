import express from 'express';
import { signout, updateUser, deleteUser } from '../controllers/userController.js';
import { verifyUser } from '../utils/veirfyUser.js';

const router = express.Router();

router.post('/signout', signout);
router.put('/update-user/:userId', verifyUser, updateUser);
router.delete('/delete-user/:userId', verifyUser, deleteUser);

export default router;