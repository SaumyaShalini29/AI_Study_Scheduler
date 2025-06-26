const express = require('express');
const router = express.Router();
const fs = require('fs');

// Dummy method to simulate fetching weekly data from DB or a file
const getWeeklySummary = () => {
  // Sample structure of weekly data
  return JSON.parse(fs.readFileSync('./data/week-summary.json', 'utf8'));
};

router.get('/', (req, res) => {
  try {
    const weeklyData = getWeeklySummary();

    const subjectTotals = {};

    weeklyData.forEach(day => {
      Object.keys(day).forEach(subject => {
        if (subject !== 'day') {
          if (!subjectTotals[subject]) subjectTotals[subject] = 0;
          subjectTotals[subject] += day[subject];
        }
      });
    });

    // Sort subjects by lowest total time (lowest performance)
    const sortedSubjects = Object.entries(subjectTotals)
      .sort((a, b) => a[1] - b[1])
      .map(entry => entry[0]);

    // Take top 3 weak subjects
    const revisionTopics = sortedSubjects.slice(0, 3);

    res.json(revisionTopics);
  } catch (err) {
    console.error('Error in /revision-topics:', err);
    res.status(500).json({ error: 'Failed to generate revision topics' });
  }
});

module.exports = router;
