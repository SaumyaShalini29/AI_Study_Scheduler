// routes/scheduleRoutes.js
import express from 'express';
import joblib from 'joblib-node';

const router = express.Router();
const model = joblib.load('study_scheduler_model.pkl');

// POST /api/schedule/suggest
router.post('/suggest', (req, res) => {
  const { priority, difficulty, performance, studyTime } = req.body;
  const p = priority === 'High' ? 2 : priority === 'Medium' ? 1 : 0;
  const d = difficulty === 'Hard' ? 2 : difficulty === 'Medium' ? 1 : 0;
  const t = studyTime === 'Morning' ? 0 : studyTime === 'Afternoon' ? 1 : 2;

  const pred = model.predict([[p, d, performance, t]])[0];
  res.json({ suggestedDuration: Math.round(pred) });
});

export default router;
