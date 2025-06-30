import React from 'react';
import SubjectAnalytics from './SubjectAnalytics';
import TodaySuggestion from "../components/TodaySuggestion";
import StreakTracker from "../StreakTracker";

function Dashboard() {
  return (
    <div className="p-4 bg-slate-200 dark:bg-gray-800 ">
      <h1 className="text-2xl font-bold mb-4 text-blue-700 dark:text-white">📚 My Study Dashboard</h1>
             <StreakTracker/>

      <SubjectAnalytics />


    </div>
  );
}

export default Dashboard;
