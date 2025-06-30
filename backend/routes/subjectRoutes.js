/*import express from 'express';
import Subject from '../models/Subject.js';

const router = express.Router();

// POST: Add multiple subjects
router.post('/bulk-add', async (req, res) => {
  try {
    const { subjects } = req.body;

    if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({ error: 'Subjects must be a non-empty array' });
    }

    for (const subject of subjects) {
      const { name, priority, difficulty, performance, studyDuration, studyTime } = subject;
      if (
        !name ||
        !priority ||
        !difficulty ||
        performance === undefined ||
        studyDuration === undefined ||
        !studyTime
      ) {
        return res.status(400).json({ error: 'Each subject must have all required fields' });
      }
    }

    await Subject.insertMany(subjects);
    res.status(201).json({ message: 'Subjects saved successfully!' });
  } catch (error) {
    console.error('Error saving multiple subjects:', error);
    res.status(500).json({ error: 'Failed to save multiple subjects' });
  }
});

// GET: Fetch all subjects
router.get('/all', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
});

// PUT: Update subject by ID
router.put('/update/:id', async (req, res) => {
  try {
    const { name, priority, difficulty, performance, studyDuration, studyTime } = req.body;
    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      { name, priority, difficulty, performance, studyDuration, studyTime },
      { new: true, runValidators: true }
    );
    if (!updatedSubject) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    res.status(200).json(updatedSubject);
  } catch (error) {
    console.error('Error updating subject:', error);
    res.status(500).json({ error: 'Failed to update subject' });
  }
});

// DELETE: Delete subject by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
    if (!deletedSubject) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    console.error('Error deleting subject:', error);
    res.status(500).json({ error: 'Failed to delete subject' });
  }
});

export default router;
*/
/*
import express from 'express';
//import { getWeeklySummary } from '../controllers/subject.controller.js';
import { getWeeklySummary,getTodaySummary, bulkAddSubjects,getDateSummary,getTopSubject,getDailyStudyTrend ,getDailySubjectPriority,} from '../controllers/subject.controller.js';
//import { getWeeklySummary,getTodaySummary, bulkAddSubjects,getDateSummary,getTopSubject,getDailyStudyTrend ,getDailySubjectPriority,} from '../controllers/subject.controller.js';


const router = express.Router();

router.get('/week-summary', getWeeklySummary);
router.post('/bulk-add', bulkAddSubjects); // ✅ add this line
router.get('/today-summary', getTodaySummary);
router.get('/date-summary', getDateSummary);
router.get('/top-subject', getTopSubject);
router.get('/daily-trend', getDailyStudyTrend);
router.get('/daily-priority', getDailySubjectPriority);





export default router;
*/
/*
import express from 'express';
import {
  getWeeklySummary,
  getTodaySummary,
  bulkAddSubjects,
  getDateSummary,
  getTopSubject,
  getDailyStudyTrend,
  getDailySubjectPriority,
  getPerformanceCategories // ✅
} from '../controllers/subject.controller.js';

const router = express.Router();

router.get('/week-summary', getWeeklySummary);
router.post('/bulk-add', bulkAddSubjects);
router.get('/today-summary', getTodaySummary);

router.get('/date-summary', getDateSummary);
router.get('/top-subject', getTopSubject);
router.get('/daily-trend', getDailyStudyTrend);
router.get('/daily-priority', getDailySubjectPriority);
router.get('/performance-breakdown', getPerformanceCategories); // ✅

export default router;

*/
/*
import express from 'express';
import {
  getWeeklySummary,
  getTodaySummary,
  bulkAddSubjects,
  getDateSummary,
  getTopSubject,
  getDailyStudyTrend,
  getDailySubjectPriority,
  getPerformanceCategories
} from '../controllers/subject.controller.js';

const router = express.Router();

// ✅ CHANGE TO POST
router.post('/week-summary', getWeeklySummary);
router.post('/today-summary', getTodaySummary);
router.post('/top-subject', getTopSubject);
router.post('/performance-breakdown', getPerformanceCategories);
router.post('/daily-trend', getDailyStudyTrend);
router.post('/daily-priority', getDailySubjectPriority);

router.post('/bulk-add', bulkAddSubjects);
router.get('/date-summary', getDateSummary); // keep GET if you're passing date in query
// Or you can make it POST too for consistency

export default router;
*/



import express from 'express';
import {
  getWeeklySummary,
  getTodaySummary,
  bulkAddSubjects,
  getDateSummary,
  getTopSubject,
  getDailyStudyTrend,
  getDailySubjectPriority,
  getPerformanceCategories,
  updateTodayWork // ✅ Added
} from '../controllers/subject.controller.js';

const router = express.Router();


// Analytics routes
//router.post('/week-summary', getWeeklySummary);
//router.get('/week-summary', getWeeklySummary); 
router.post('/week-summary', getWeeklySummary);

router.post('/today-summary', getTodaySummary);
router.post('/top-subject', getTopSubject);
router.post('/performance-breakdown', getPerformanceCategories);
router.post('/daily-trend', getDailyStudyTrend);
router.post('/daily-priority', getDailySubjectPriority);

// Subject routes
router.post('/bulk-add', bulkAddSubjects);
router.get('/date-summary', getDateSummary); // if using ?date=
router.post('/update-today', updateTodayWork); // ✅ Added route
router.get('/test', (req, res) => {
  res.json({ message: "✅ subject route test working" });
});

export default router;
/*
import express from 'express';
import {
  getWeeklySummary,
  getTodaySummary,
  bulkAddSubjects,
  getDateSummary,
  getTopSubject,
  getDailyStudyTrend,
  getDailySubjectPriority,
  getPerformanceCategories,
  updateTodayWork
} from '../controllers/subject.controller.js';

const router = express.Router();

// ✅ Analytics Routes
router.post('/week-summary', getWeeklySummary);
router.post('/today-summary', getTodaySummary);
router.post('/top-subject', getTopSubject);
router.post('/performance-breakdown', getPerformanceCategories);
router.post('/daily-trend', getDailyStudyTrend);
router.post('/daily-priority', getDailySubjectPriority);

// ✅ Subject Routes
router.post('/bulk-add', bulkAddSubjects);
router.get('/date-summary', getDateSummary); // usage: ?userId=...&date=YYYY-MM-DD
router.post('/update-today', updateTodayWork);

// ✅ Test Route
router.get('/test', (req, res) => {
  res.json({ message: "✅ subject route test working" });
});

export default router;
*/