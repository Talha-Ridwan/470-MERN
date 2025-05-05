import express from 'express';
import { registerUser, loginUser, logoutUser, getCurrentUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.get('/current', getCurrentUser);

export default router;
