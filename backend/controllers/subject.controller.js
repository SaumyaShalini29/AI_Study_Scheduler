// controllers/subjectController.js
//import Subject from '../models/Subject';
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


