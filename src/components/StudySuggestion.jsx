import React from 'react';

const StudySuggestion = ({ weeklyData, topSubject }) => {
  const getSuggestion = () => {
    if (!Array.isArray(weeklyData) || weeklyData.length === 0) {
      return "📊 Waiting for study data to load...";
    }

    let subjectTotals = {};

    weeklyData.forEach(day => {
      Object.entries(day).forEach(([subject, value]) => {
        if (subject !== 'day') {
          subjectTotals[subject] = (subjectTotals[subject] || 0) + value;
        }
      });
    });

    const leastStudied = Object.entries(subjectTotals)
      .sort((a, b) => a[1] - b[1])[0][0];

    return `📌 Today you should focus on: **${leastStudied}**, as it had the least study time this week.
🔁 Your most studied subject is: **${topSubject}** — great job! Keep the balance!`;
  };

  return (
    <div className="bg-indigo-100 text-indigo-900 rounded-lg shadow p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">🧠 Smart AI Suggestion</h2>
      <p className="whitespace-pre-line">{getSuggestion()}</p>
    </div>
  );
};

export default StudySuggestion;
