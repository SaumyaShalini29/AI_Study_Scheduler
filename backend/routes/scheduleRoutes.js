import express from 'express';
//import { getScheduleSuggestion } from '../controllers/scheduleController.js';
import { getStudySuggestion } from '../controllers/scheduleController.js';

const router = express.Router();

//router.post('/suggest', getScheduleSuggestion);
router.post('/suggest', getStudySuggestion);
export default router;
