// controllers/subjectController.js
//import Subject from '../models/Subject';
/*
import Subject from '../models/Subject.js';
export const bulkAddSubjects = async (req, res) => {
  try {
    const subjects = req.body.subjects; // ✅ FIXED: Access the `subjects` array properly
    const insertedSubjects = await Subject.insertMany(subjects);
    res.status(201).json(insertedSubjects);
  } catch (error) {
    console.error("Bulk add error:", error);
    res.status(500).json({ message: "Bulk add failed", error });
  }
};

export const getWeeklySummary = async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);

    const subjects = await Subject.find({ createdAt: { $gte: oneWeekAgo } });

    const summaryByDay = {};
    for (let i = 0; i < 7; i++) {
      const day = new Date();
      day.setDate(day.getDate() - i);
      summaryByDay[day.toDateString()] = {};
    }

    subjects.forEach((sub) => {
      const dayKey = new Date(sub.createdAt).toDateString();
      if (!summaryByDay[dayKey]) return;

      if (!summaryByDay[dayKey][sub.name]) {
        summaryByDay[dayKey][sub.name] = 0;
      }
      summaryByDay[dayKey][sub.name] += sub.studyDuration;
    });

    const chartData = Object.entries(summaryByDay)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .map(([date, subjectMap]) => {
        if (Object.keys(subjectMap).length === 0) return null; // skip empty days
        return {
          day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
          ...subjectMap,
        };
      })
      .filter(Boolean); // remove nulls

    res.json(chartData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error generating weekly summary' });
  }
};
export const getTodaySummary = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    const subjects = await Subject.find({ createdAt: { $gte: today } });

    const subjectMap = {};
    subjects.forEach((sub) => {
      if (!subjectMap[sub.name]) {
        subjectMap[sub.name] = 0;
      }
      subjectMap[sub.name] += sub.studyDuration;
    });

    const result = [
      {
        day: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
        ...subjectMap,
      },
    ];

    res.json(result);
  } catch (err) {
    console.error("Today's summary error:", err);
    res.status(500).json({ message: 'Error generating today summary' });
  }
};

export const getDateSummary = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: "Date is required" });

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const subjects = await Subject.find({
      createdAt: { $gte: start, $lte: end }
    });

    const subjectMap = {};
    subjects.forEach((sub) => {
      if (!subjectMap[sub.name]) {
        subjectMap[sub.name] = 0;
      }
      subjectMap[sub.name] += sub.studyDuration;
    });

    const result = [
      {
        day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        ...subjectMap,
      },
    ];

    res.json(result);
  } catch (err) {
    console.error("Date summary error:", err);
    res.status(500).json({ message: 'Error generating date summary' });
  }
};

export const getTopSubject = async (req, res) => {
  try {
    const subjects = await Subject.find({});
    const totals = {};

    subjects.forEach((s) => {
      totals[s.name] = (totals[s.name] || 0) + s.studyDuration;
    });

    const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    const [topSubject, totalDuration] = sorted[0];

    res.json({ subject: topSubject, duration: totalDuration });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching top subject' });
  }
};


export const getDailySubjectPriority = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: "Date is required" });

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const subjects = await Subject.find({ createdAt: { $gte: start, $lte: end } });

    const subjectMap = {};
    subjects.forEach((s) => {
      subjectMap[s.name] = (subjectMap[s.name] || 0) + s.studyDuration;
    });

    const result = Object.entries(subjectMap).map(([subject, value]) => ({
      subject,
      value
    }));

    res.json(result);
  } catch (err) {
    console.error("Daily subject priority error:", err);
    res.status(500).json({ message: 'Error generating daily subject priority' });
  }
};
export const getPerformanceCategories = async (req, res) => {
  try {
    const subjects = await Subject.find({});

    const ranges = [
      { label: "Excellent", min: 80, max: 100 },
      { label: "Good", min: 60, max: 79 },
      { label: "Moderate", min: 40, max: 59 },
      { label: "Poor", min: 0, max: 39 }
    ];

    const categoryCounts = {};
    ranges.forEach(range => (categoryCounts[range.label] = 0));

    subjects.forEach((s) => {
      const category = ranges.find(r => s.performance >= r.min && s.performance <= r.max);
      if (category) {
        categoryCounts[category.label]++;
      }
    });

    const result = Object.entries(categoryCounts).map(([category, value]) => ({
      category,
      value
    }));

    res.json(result);
  } catch (err) {
    console.error("Performance breakdown error:", err);
    res.status(500).json({ message: 'Error generating performance breakdown' });
  }
};

export const getDailyStudyTrend = async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);

    const subjects = await Subject.find({ createdAt: { $gte: oneWeekAgo } });

    const dailyTrend = {};
    for (let i = 0; i < 7; i++) {
      const day = new Date();
      day.setDate(day.getDate() - i);
      dailyTrend[day.toDateString()] = 0;
    }

    subjects.forEach((s) => {
      const key = new Date(s.createdAt).toDateString();
      if (dailyTrend[key] !== undefined) {
        dailyTrend[key] += s.studyDuration;
      }
    });

    const result = Object.entries(dailyTrend)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .map(([date, total]) => ({
        day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        totalDuration: total,
      }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error generating trend data' });
  }
};
*/

/*
import Subject from '../models/Subject.js';

// 🔄 Utility to extract userId from req
const getUserId = (req) =>
  req.body?.userId || req.query?.userId || req.params?.userId;

// 📌 Bulk Add Subjects

export const bulkAddSubjects = async (req, res) => {
  try {
    const { subjects } = req.body;
    if (!subjects || !Array.isArray(subjects)) {
      return res.status(400).json({ error: 'Invalid subjects data' });
    }

    const result = await Subject.insertMany(subjects);
    res.status(200).json({ message: 'Subjects saved successfully', data: result });
  } catch (err) {
    console.error('Bulk add error:', err);
    res.status(500).json({ error: 'Failed to save subjects' });
  }
};

export const getWeeklySummary = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ message: "userId required" });

    // Get today's date at 00:00 UTC (Mongo stores in UTC)
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const oneWeekAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);

    const subjects = await Subject.find({
      userId,
      createdAt: { $gte: oneWeekAgo }
    });

    // Prepare day-wise map
    const summaryByDay = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date(oneWeekAgo.getTime() + i * 24 * 60 * 60 * 1000);
      summaryByDay[date.toDateString()] = {};
    }

    subjects.forEach((sub) => {
      const createdDate = new Date(sub.createdAt);
      createdDate.setUTCHours(0, 0, 0, 0);
      const key = createdDate.toDateString();

      if (!summaryByDay[key]) return;

      summaryByDay[key][sub.name] = (summaryByDay[key][sub.name] || 0) + sub.studyDuration;
    });

    const chartData = Object.entries(summaryByDay).map(([date, subjectMap]) => ({
      day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      ...subjectMap,
    }));

    res.json(chartData);
  } catch (err) {
    console.error("Weekly summary error:", err);
    res.status(500).json({ message: 'Error generating weekly summary' });
  }
};

export const getTodaySummary = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ message: "userId required" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const subjects = await Subject.find({ userId, createdAt: { $gte: today } });

    const subjectMap = {};
    subjects.forEach((sub) => {
      if (!subjectMap[sub.name]) {
        subjectMap[sub.name] = 0;
      }
      subjectMap[sub.name] += sub.studyDuration;
    });

    const result = [
      {
        day: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
        ...subjectMap,
      },
    ];

    res.json(result);
  } catch (err) {
    console.error("Today's summary error:", err);
    res.status(500).json({ message: 'Error generating today summary' });
  }
};
// 📌 Update today's work (add extra study time for a subject)
export const updateTodayWork = async (req, res) => {
  try {
    const { userId, subjectId, completedMinutes } = req.body;

    if (!userId || !subjectId || !completedMinutes) {
      return res.status(400).json({ message: "userId, subjectId, and completedMinutes are required" });
    }

    const subject = await Subject.findOne({ _id: subjectId, userId });

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // ✅ Update the study duration
    subject.studyDuration += completedMinutes;
    await subject.save();

    res.json({ message: "✅ Study time updated", updatedDuration: subject.studyDuration });
  } catch (err) {
    console.error("Update today's work error:", err);
    res.status(500).json({ message: "❌ Failed to update study time" });
  }
};
// ✅ Utility for IST offset
const istOffset = 5.5 * 60 * 60 * 1000;

export const getDailySubjectPriority = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: "Date is required" });

    const d = new Date(date);
    const start = new Date(d.getTime() - istOffset);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setUTCHours(23, 59, 59, 999);

    const subjects = await Subject.find({ createdAt: { $gte: start, $lte: end } });

    const subjectMap = {};
    subjects.forEach((s) => {
      const name = s.name.trim(); // ✅ fix subject name spacing
      subjectMap[name] = (subjectMap[name] || 0) + s.studyDuration;
    });

    const result = Object.entries(subjectMap).map(([subject, value]) => ({
      subject,
      value
    }));

    res.json(result);
  } catch (err) {
    console.error("Daily subject priority error:", err);
    res.status(500).json({ message: 'Error generating daily subject priority' });
  }
};

export const getPerformanceCategories = async (req, res) => {
  try {
    const subjects = await Subject.find({});

    const ranges = [
      { label: "Excellent", min: 80, max: 100 },
      { label: "Good", min: 60, max: 79 },
      { label: "Moderate", min: 40, max: 59 },
      { label: "Poor", min: 0, max: 39 }
    ];

    const categoryCounts = {};
    ranges.forEach(range => (categoryCounts[range.label] = 0));

    subjects.forEach((s) => {
      const category = ranges.find(r => s.performance >= r.min && s.performance <= r.max);
      if (category) {
        categoryCounts[category.label]++;
      }
    });

    const result = Object.entries(categoryCounts).map(([category, value]) => ({
      category,
      value
    }));

    res.json(result);
  } catch (err) {
    console.error("Performance breakdown error:", err);
    res.status(500).json({ message: 'Error generating performance breakdown' });
  }
};

export const getDateSummary = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: "Date is required" });

    const d = new Date(date);
    const start = new Date(d.getTime() - istOffset);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setUTCHours(23, 59, 59, 999);

    const subjects = await Subject.find({
      createdAt: { $gte: start, $lte: end }
    });

    const subjectMap = {};
    subjects.forEach((sub) => {
      const name = sub.name.trim(); // ✅ clean spacing
      subjectMap[name] = (subjectMap[name] || 0) + sub.studyDuration;
    });

    const result = [
      {
        day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        ...subjectMap,
      },
    ];

    res.json(result);
  } catch (err) {
    console.error("Date summary error:", err);
    res.status(500).json({ message: 'Error generating date summary' });
  }
};


// 📌 Specific Date Summary
export const getDateSummary = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { date } = req.query;
    if (!userId || !date) return res.status(400).json({ message: "userId and date required" });

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const subjects = await Subject.find({
      userId,
      createdAt: { $gte: start, $lte: end }
    });

    const subjectMap = {};
    subjects.forEach((sub) => {
      if (!subjectMap[sub.name]) {
        subjectMap[sub.name] = 0;
      }
      subjectMap[sub.name] += sub.studyDuration;
    });

    const result = [
      {
        day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        ...subjectMap,
      },
    ];

    res.json(result);
  } catch (err) {
    console.error("Date summary error:", err);
    res.status(500).json({ message: 'Error generating date summary' });
  }
};

// 📌 Top Subject
export const getTopSubject = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ message: "userId required" });

    const subjects = await Subject.find({ userId });

    const totals = {};
    subjects.forEach((s) => {
      totals[s.name] = (totals[s.name] || 0) + s.studyDuration;
    });

    const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    if (sorted.length === 0) return res.json({ subject: "N/A", duration: 0 });

    const [topSubject, totalDuration] = sorted[0];

    res.json({ subject: topSubject, duration: totalDuration });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching top subject' });
  }
};

// 📌 Daily Subject Priority
export const getDailySubjectPriority = async (req, res) => {
  try {
    const { date } = req.query;
const userId = req.query.userId;

    
    if (!userId || !date) return res.status(400).json({ message: "userId and date required" });

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const subjects = await Subject.find({ userId, createdAt: { $gte: start, $lte: end } });

    const subjectMap = {};
    subjects.forEach((s) => {
      subjectMap[s.name] = (subjectMap[s.name] || 0) + s.studyDuration;
    });

    const result = Object.entries(subjectMap).map(([subject, value]) => ({
      subject,
      value
    }));

    res.json(result);
  } catch (err) {
    console.error("Daily subject priority error:", err);
    res.status(500).json({ message: 'Error generating daily subject priority' });
  }
};

// 📌 Performance Category Breakdown
export const getPerformanceCategories = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ message: "userId required" });

    const subjects = await Subject.find({ userId });

    const ranges = [
      { label: "Excellent", min: 80, max: 100 },
      { label: "Good", min: 60, max: 79 },
      { label: "Moderate", min: 40, max: 59 },
      { label: "Poor", min: 0, max: 39 }
    ];

    const categoryCounts = {};
    ranges.forEach(range => (categoryCounts[range.label] = 0));

    subjects.forEach((s) => {
      const category = ranges.find(r => s.performance >= r.min && s.performance <= r.max);
      if (category) {
        categoryCounts[category.label]++;
      }
    });

    const result = Object.entries(categoryCounts).map(([category, value]) => ({
      category,
      value
    }));

    res.json(result);
  } catch (err) {
    console.error("Performance breakdown error:", err);
    res.status(500).json({ message: 'Error generating performance breakdown' });
  }
};

// 📌 Daily Trend (total study duration per day)
export const getDailyStudyTrend = async (req, res) => {
  try {
    const userId = getUserId(req);
    

    if (!userId) return res.status(400).json({ message: "userId required" });

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);

    const subjects = await Subject.find({ userId, createdAt: { $gte: oneWeekAgo } });

    const dailyTrend = {};
    for (let i = 0; i < 7; i++) {
      const day = new Date();
      day.setDate(day.getDate() - i);
      dailyTrend[day.toDateString()] = 0;
    }

    subjects.forEach((s) => {
      const key = new Date(s.createdAt).toDateString();
      if (dailyTrend[key] !== undefined) {
        dailyTrend[key] += s.studyDuration;
      }
    });

    const result = Object.entries(dailyTrend)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .map(([date, total]) => ({
        day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        totalDuration: total,
      }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error generating trend data' });
  }
};
*/
/*
import Subject from '../models/Subject.js';

// Utility
const getUserId = (req) =>
  req.body?.userId || req.query?.userId || req.params?.userId;

const istOffset = 5.5 * 60 * 60 * 1000;

// 📌 Bulk Add
export const bulkAddSubjects = async (req, res) => {
  try {
    const { subjects } = req.body;
    if (!subjects || !Array.isArray(subjects)) {
      return res.status(400).json({ error: 'Invalid subjects data' });
    }
    const result = await Subject.insertMany(subjects);
    res.status(200).json({ message: 'Subjects saved successfully', data: result });
  } catch (err) {
    console.error('Bulk add error:', err);
    res.status(500).json({ error: 'Failed to save subjects' });
  }
};

*/
/*
export const getWeeklySummary = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ message: "userId required" });

    // Define the range: today to 6 days ago
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const oneWeekAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);

    // Fetch subjects within this date range
    const subjects = await Subject.find({
      userId,
      createdAt: { $gte: oneWeekAgo, $lte: new Date() }
    });

    console.log("📦 Subjects found:", subjects.length);

    // Prepare empty 7-day structure
    const summaryByDay = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date(oneWeekAgo.getTime() + i * 24 * 60 * 60 * 1000);
      summaryByDay[date.toDateString()] = {};
    }

    // Fill in study durations per subject per day
    subjects.forEach((sub) => {
      const date = new Date(sub.createdAt);
      date.setHours(0, 0, 0, 0);
      const key = date.toDateString();
      if (!summaryByDay[key]) return;

      const name = sub.name.trim();
      summaryByDay[key][name] = (summaryByDay[key][name] || 0) + sub.studyDuration;
    });

    // Format for chart: array of { day, subject1: min, subject2: min, ... }
    const chartData = Object.entries(summaryByDay).map(([date, subjectMap]) => ({
      day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      ...subjectMap,
    }));

    console.log("📊 Final Chart Data:", chartData);
    res.json(chartData);
  } catch (err) {
    console.error("❌ Weekly summary error:", err);
    res.status(500).json({ message: 'Error generating weekly summary' });
  }
};
*/
/*
export const getWeeklySummary = async (userId) => {
  try {
    const res = await fetch("http://localhost:5000/api/subject/week-summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }), // ✅ send userId in request body
    });

    const data = await res.json();
    console.log("📊 Weekly Summary:", data);
    return data;
  } catch (err) {
    console.error("❌ Error fetching weekly summary:", err);
  }
};


export const getTodaySummary = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ message: "userId required" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const subjects = await Subject.find({ userId, createdAt: { $gte: today } });

    const subjectMap = {};
    subjects.forEach((sub) => {
      const name = sub.name.trim();
      subjectMap[name] = (subjectMap[name] || 0) + sub.studyDuration;
    });

    const result = [
      {
        day: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
        ...subjectMap,
      },
    ];

    res.json(result);
  } catch (err) {
    console.error("Today's summary error:", err);
    res.status(500).json({ message: 'Error generating today summary' });
  }
};

// 📌 Update Study Time
export const updateTodayWork = async (req, res) => {
  try {
    const { userId, subjectId, completedMinutes } = req.body;
    if (!userId || !subjectId || !completedMinutes) {
      return res.status(400).json({ message: "userId, subjectId, and completedMinutes are required" });
    }

    const subject = await Subject.findOne({ _id: subjectId, userId });
    if (!subject) return res.status(404).json({ message: "Subject not found" });

    subject.studyDuration += completedMinutes;
    await subject.save();

    res.json({ message: "✅ Study time updated", updatedDuration: subject.studyDuration });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "❌ Failed to update study time" });
  }
};


export const getDailySubjectPriority = async (req, res) => {
  try {
    const { date } = req.body; // ✅ fixed here
    const userId = getUserId(req);
    if (!userId || !date) return res.status(400).json({ message: "userId and date required" });

    const d = new Date(date);
    const start = new Date(d);
    start.setHours(0, 0, 0, 0); // ✅ IST

    const end = new Date(d);
    end.setHours(23, 59, 59, 999); // ✅ IST

    const subjects = await Subject.find({ userId, createdAt: { $gte: start, $lte: end } });

    const subjectMap = {};
    subjects.forEach((s) => {
      const name = s.name.trim();
      subjectMap[name] = (subjectMap[name] || 0) + s.studyDuration;
    });

    const result = Object.entries(subjectMap).map(([subject, value]) => ({ subject, value }));
    res.json(result);
  } catch (err) {
    console.error("Daily subject priority error:", err);
    res.status(500).json({ message: 'Error generating daily subject priority' });
  }
};

// 📌 Performance Categories
export const getPerformanceCategories = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ message: "userId required" });

    const subjects = await Subject.find({ userId });

    const ranges = [
      { label: "Excellent", min: 80, max: 100 },
      { label: "Good", min: 60, max: 79 },
      { label: "Moderate", min: 40, max: 59 },
      { label: "Poor", min: 0, max: 39 }
    ];

    const categoryCounts = {};
    ranges.forEach(range => categoryCounts[range.label] = 0);

    subjects.forEach((s) => {
      const category = ranges.find(r => s.performance >= r.min && s.performance <= r.max);
      if (category) categoryCounts[category.label]++;
    });

    const result = Object.entries(categoryCounts).map(([category, value]) => ({ category, value }));
    res.json(result);
  } catch (err) {
    console.error("Performance breakdown error:", err);
    res.status(500).json({ message: 'Error generating performance breakdown' });
  }
};

export const getDateSummary = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { date } = req.query;
    if (!userId || !date) return res.status(400).json({ message: "userId and date required" });

    const d = new Date(date);
    const start = new Date(d);
    start.setHours(0, 0, 0, 0); // ✅ local time (IST)

    const end = new Date(d);
    end.setHours(23, 59, 59, 999); // ✅ local time (IST)

    const subjects = await Subject.find({
      userId,
      createdAt: { $gte: start, $lte: end }
    });

    const subjectMap = {};
    subjects.forEach((sub) => {
      subjectMap[sub.name.trim()] = (subjectMap[sub.name.trim()] || 0) + sub.studyDuration;
    });

    const result = [
      {
        day: start.toLocaleDateString('en-US', { weekday: 'short' }),
        ...subjectMap,
      },
    ];

    res.json(result);
  } catch (err) {
    console.error("Date summary error:", err);
    res.status(500).json({ message: 'Error generating date summary' });
  }
};

export const getTopSubject = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ message: "userId required" });

    const subjects = await Subject.find({ userId });

    const totals = {};
    subjects.forEach((s) => {
      const name = s.name.trim();
      totals[name] = (totals[name] || 0) + s.studyDuration;
    });

    const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    if (sorted.length === 0) return res.json({ subject: "N/A", duration: 0 });

    const [topSubject, totalDuration] = sorted[0];
    res.json({ subject: topSubject, duration: totalDuration });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching top subject' });
  }
};

// 📌 Daily Study Trend
export const getDailyStudyTrend = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ message: "userId required" });

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const oneWeekAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);

    const subjects = await Subject.find({ userId, createdAt: { $gte: oneWeekAgo } });

    const dailyTrend = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date(oneWeekAgo.getTime() + i * 24 * 60 * 60 * 1000);
      dailyTrend[date.toDateString()] = 0;
    }

    subjects.forEach((s) => {
      const key = new Date(s.createdAt).toDateString();
      if (dailyTrend[key] !== undefined) {
        dailyTrend[key] += s.studyDuration;
      }
    });

    const result = Object.entries(dailyTrend).map(([date, total]) => ({
      day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      totalDuration: total,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error generating trend data' });
  }
};
*/
import Subject from '../models/Subject.js';

// Utility
const getUserId = (req) =>
  req.body?.userId || req.query?.userId || req.params?.userId;

// 📌 Bulk Add
export const bulkAddSubjects = async (req, res) => {
  try {
    const { subjects } = req.body;
    if (!subjects || !Array.isArray(subjects)) {
      return res.status(400).json({ error: 'Invalid subjects data' });
    }
    const result = await Subject.insertMany(subjects);
    res.status(200).json({ message: 'Subjects saved successfully', data: result });
  } catch (err) {
    console.error('Bulk add error:', err);
    res.status(500).json({ error: 'Failed to save subjects' });
  }
};

// ✅ Correct Weekly Summary Controller
export const getWeeklySummary = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ message: "userId required" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const oneWeekAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);

    const subjects = await Subject.find({
      userId,
      createdAt: { $gte: oneWeekAgo, $lte: new Date() }
    });

    const summaryByDay = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date(oneWeekAgo.getTime() + i * 24 * 60 * 60 * 1000);
      summaryByDay[date.toDateString()] = {};
    }

    subjects.forEach((sub) => {
      const date = new Date(sub.createdAt);
      date.setHours(0, 0, 0, 0);
      const key = date.toDateString();
      if (!summaryByDay[key]) return;

      const name = sub.name.trim();
      summaryByDay[key][name] = (summaryByDay[key][name] || 0) + sub.studyDuration;
    });

    const chartData = Object.entries(summaryByDay).map(([date, subjectMap]) => ({
      day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      ...subjectMap,
    }));

    res.json(chartData);
  } catch (err) {
    console.error("❌ Weekly summary error:", err);
    res.status(500).json({ message: 'Error generating weekly summary' });
  }
};

export const getTodaySummary = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ message: "userId required" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const subjects = await Subject.find({ userId, createdAt: { $gte: today } });

    const subjectMap = {};
    subjects.forEach((sub) => {
      const name = sub.name.trim();
      subjectMap[name] = (subjectMap[name] || 0) + sub.studyDuration;
    });

    const result = [
      {
        day: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
        ...subjectMap,
      },
    ];

    res.json(result);
  } catch (err) {
    console.error("Today's summary error:", err);
    res.status(500).json({ message: 'Error generating today summary' });
  }
};

// 📌 Update Study Time
export const updateTodayWork = async (req, res) => {
  try {
    const { userId, subjectId, completedMinutes } = req.body;
    if (!userId || !subjectId || !completedMinutes) {
      return res.status(400).json({ message: "userId, subjectId, and completedMinutes are required" });
    }

    const subject = await Subject.findOne({ _id: subjectId, userId });
    if (!subject) return res.status(404).json({ message: "Subject not found" });

    subject.studyDuration += completedMinutes;
    await subject.save();

    res.json({ message: "✅ Study time updated", updatedDuration: subject.studyDuration });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "❌ Failed to update study time" });
  }
};

export const getDailySubjectPriority = async (req, res) => {
  try {
    const { date } = req.body;
    const userId = getUserId(req);
    if (!userId || !date) return res.status(400).json({ message: "userId and date required" });

    const d = new Date(date);
    const start = new Date(d);
    start.setHours(0, 0, 0, 0);

    const end = new Date(d);
    end.setHours(23, 59, 59, 999);

    const subjects = await Subject.find({ userId, createdAt: { $gte: start, $lte: end } });

    const subjectMap = {};
    subjects.forEach((s) => {
      const name = s.name.trim();
      subjectMap[name] = (subjectMap[name] || 0) + s.studyDuration;
    });

    const result = Object.entries(subjectMap).map(([subject, value]) => ({ subject, value }));
    res.json(result);
  } catch (err) {
    console.error("Daily subject priority error:", err);
    res.status(500).json({ message: 'Error generating daily subject priority' });
  }
};

// 📌 Performance Categories
export const getPerformanceCategories = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ message: "userId required" });

    const subjects = await Subject.find({ userId });

    const ranges = [
      { label: "Excellent", min: 80, max: 100 },
      { label: "Good", min: 60, max: 79 },
      { label: "Moderate", min: 40, max: 59 },
      { label: "Poor", min: 0, max: 39 }
    ];

    const categoryCounts = {};
    ranges.forEach(range => categoryCounts[range.label] = 0);

    subjects.forEach((s) => {
      const category = ranges.find(r => s.performance >= r.min && s.performance <= r.max);
      if (category) categoryCounts[category.label]++;
    });

    const result = Object.entries(categoryCounts).map(([category, value]) => ({ category, value }));
    res.json(result);
  } catch (err) {
    console.error("Performance breakdown error:", err);
    res.status(500).json({ message: 'Error generating performance breakdown' });
  }
};

export const getDateSummary = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { date } = req.query;
    if (!userId || !date) return res.status(400).json({ message: "userId and date required" });

    const d = new Date(date);
    const start = new Date(d);
    start.setHours(0, 0, 0, 0);

    const end = new Date(d);
    end.setHours(23, 59, 59, 999);

    const subjects = await Subject.find({
      userId,
      createdAt: { $gte: start, $lte: end }
    });

    const subjectMap = {};
    subjects.forEach((sub) => {
      subjectMap[sub.name.trim()] = (subjectMap[sub.name.trim()] || 0) + sub.studyDuration;
    });

    const result = [
      {
        day: start.toLocaleDateString('en-US', { weekday: 'short' }),
        ...subjectMap,
      },
    ];

    res.json(result);
  } catch (err) {
    console.error("Date summary error:", err);
    res.status(500).json({ message: 'Error generating date summary' });
  }
};

export const getTopSubject = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ message: "userId required" });

    const subjects = await Subject.find({ userId });

    const totals = {};
    subjects.forEach((s) => {
      const name = s.name.trim();
      totals[name] = (totals[name] || 0) + s.studyDuration;
    });

    const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    if (sorted.length === 0) return res.json({ subject: "N/A", duration: 0 });

    const [topSubject, totalDuration] = sorted[0];
    res.json({ subject: topSubject, duration: totalDuration });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching top subject' });
  }
};

export const getDailyStudyTrend = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(400).json({ message: "userId required" });

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const oneWeekAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);

    const subjects = await Subject.find({ userId, createdAt: { $gte: oneWeekAgo } });

    const dailyTrend = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date(oneWeekAgo.getTime() + i * 24 * 60 * 60 * 1000);
      dailyTrend[date.toDateString()] = 0;
    }

    subjects.forEach((s) => {
      const key = new Date(s.createdAt).toDateString();
      if (dailyTrend[key] !== undefined) {
        dailyTrend[key] += s.studyDuration;
      }
    });

    const result = Object.entries(dailyTrend).map(([date, total]) => ({
      day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      totalDuration: total,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error generating trend data' });
  }
};
