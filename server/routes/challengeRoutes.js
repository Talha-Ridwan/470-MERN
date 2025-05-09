import express from 'express';
import { startChallenge, getCurrentChallenge, completeDay, cancelChallenge, populateTasks } from '../controllers/challengeController.js';

const router = express.Router();

router.post('/start', startChallenge);
router.get('/current', getCurrentChallenge);
router.post('/complete-day', completeDay);
router.post('/cancel', cancelChallenge);
router.post("/populate-tasks", populateTasks);
export default router;