import React from 'react';
import SubjectAnalytics from './SubjectAnalytics';
import TodaySuggestion from "../components/TodaySuggestion";
import StreakTracker from "../StreakTracker";

function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📚 My Study Dashboard</h1>
             <StreakTracker/>

      <SubjectAnalytics />


    </div>
  );
}

export default Dashboard;
