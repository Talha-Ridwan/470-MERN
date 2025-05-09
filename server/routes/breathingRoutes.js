import express from 'express';
import { registerInhale, checkStatus } from '../controllers/breathingController.js';

const router = express.Router();

router.post('/inhale', registerInhale);
router.get('/status', checkStatus);

export default router;
