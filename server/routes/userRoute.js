import express from 'express';
import { signout, updateUser, deleteUser, getUsers, getUser } from '../controllers/userController.js';
import { verifyUser } from '../utils/veirfyUser.js';

const router = express.Router();

router.get('/get-users', getUsers);
router.post('/signout', signout);
router.get('/get-user/:userId', verifyUser, getUser);
router.put('/update-user/:userId', verifyUser, updateUser);
router.delete('/delete-user/:userId', verifyUser, deleteUser);

export default router;