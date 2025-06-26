import React from 'react';

const WeeklyPlanner = ({ weeklyData }) => {
const generatePlan = () => {
  if (!Array.isArray(weeklyData) || weeklyData.length === 0) return [];

  const subjects = Object.keys(weeklyData[0]).filter(key => key !== 'day');
  const dailyPlan = [];

  for (let i = 0; i < 7; i++) {
    const day = `Day ${i + 1}`;
    const plan = subjects.map(sub => ({
      subject: sub,
      duration: Math.floor(Math.random() * 45 + 30), // 30–75 mins
    }));
    dailyPlan.push({ day, plan });
  }

  return dailyPlan;
};

  const plan = generatePlan();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">📅 AI Weekly Study Plan</h2>
      <ul className="space-y-4">
        {plan.map(day => (
          <li key={day.day}>
            <strong>{day.day}:</strong>
            <ul className="ml-4 list-disc text-sm">
              {day.plan.map((p, idx) => (
                <li key={idx}>
                  Study <span className="font-semibold">{p.subject}</span> for {p.duration} minutes
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyPlanner;
