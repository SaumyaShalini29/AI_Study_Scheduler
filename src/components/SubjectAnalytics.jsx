
import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

const SubjectAnalytics = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [todayData, setTodayData] = useState([]);
  const [dateData, setDateData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [performanceBreakdown, setPerformanceBreakdown] = useState([]);
  const [topSubject, setTopSubject] = useState('');
  const [progressTrend, setProgressTrend] = useState([]);
  const [dailySubjectPriority, setDailySubjectPriority] = useState([]);

  
useEffect(() => {
  // 1. Fetch Weekly Data FIRST (as others depend on it)
  fetch('http://localhost:5000/api/subject/week-summary')
    .then(res => res.json())
    .then(data => {
      setWeeklyData(data);

      // Fallback Top Subject Calculation
      const subjectTotals = {};
      data.forEach(day => {
        Object.entries(day).forEach(([subject, time]) => {
          if (subject !== 'day') {
            subjectTotals[subject] = (subjectTotals[subject] || 0) + time;
          }
        });
      });
      const top = Object.entries(subjectTotals).sort((a, b) => b[1] - a[1])[0];
      setTopSubject(top ? top[0] : '');
    })
    .catch(err => console.error("Weekly data fetch error", err));

  // 2. Fetch Top Subject from API
  fetch('http://localhost:5000/api/subject/top-subject')
    .then(res => res.json())
    .then(data => {
      if (data?.topSubject) setTopSubject(data.topSubject);
    })
    .catch(err => console.error("Top subject fetch error", err));

  // 3. Fetch Today Data
  fetch('http://localhost:5000/api/subject/today-summary')
    .then(res => res.json())
    .then(setTodayData)
    .catch(err => console.error("Today fetch error", err));

  // 4. Fetch Performance Breakdown
  fetch('http://localhost:5000/api/subject/performance-breakdown')
    .then(res => res.json())
    .then(setPerformanceBreakdown)
    .catch(err => console.error("Performance breakdown fetch error", err));

  // 5. Fetch Study Trend
  fetch('http://localhost:5000/api/subject/daily-trend')
    .then(res => res.json())
    .then(setProgressTrend)
    .catch(err => console.error("Progress trend fetch error", err));
}, []);

  const COLORS = ['#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa'];
/*
  const renderBarChart = (data, title) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        {title}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data.filter(row => Object.keys(row).length > 1)}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" stroke="#8884d8" />
          <YAxis stroke="#a66cff" />
          <Tooltip />
          <Legend />
          {data.length > 0 &&
            Object.keys(data[0])
              .filter(key => key !== 'day')

              const subjectKeys = Array.from(
  new Set(
    data.flatMap(row =>
      Object.keys(row).filter(key => key !== 'day')
    )
  )
);

{subjectKeys.map((subject, index) => (
  <Bar
    key={subject}
    dataKey={subject}
    stackId="a"
    fill={COLORS[index % COLORS.length]}
  />
))}

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
  */
 const renderBarChart = (data, title) => {
  const COLORS = ['#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa'];

  // ✅ Extract all unique subjects from the data
  const subjectKeys = Array.from(
    new Set(
      data.flatMap(row =>
        Object.keys(row).filter(key => key !== 'day')
      )
    )
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        {title}
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data.filter(row => Object.keys(row).length > 1)}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" stroke="#8884d8" />
          <YAxis stroke="#a66cff" />
          <Tooltip />
          <Legend />

          {/* ✅ Render all subject bars dynamically */}
          {subjectKeys.map((subject, index) => (
            <Bar
              key={subject}
              dataKey={subject}
              stackId="a"
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};


  const fetchDateSummary = () => {
    if (!selectedDate) return;
    fetch(`http://localhost:5000/api/subject/date-summary?date=${selectedDate}`)
      .then(res => res.json())
      .then(setDateData)
      .catch(err => console.error("Date fetch error", err));

    fetch(`http://localhost:5000/api/subject/daily-priority?date=${selectedDate}`)
      .then(res => res.json())
      .then(setDailySubjectPriority)
      .catch(err => console.error("Daily priority fetch error", err));
  };

  const renderPerformancePieChart = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        🎯 Performance Category Breakdown
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={performanceBreakdown}
            dataKey="value"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {performanceBreakdown.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  const renderDailyPriorityPieChart = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        🥇 Subject Priority (Study Time Distribution)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={dailySubjectPriority}
            dataKey="value"
            nameKey="subject"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {dailySubjectPriority.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  const renderLineChart = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        📈 Daily Study Duration Trend
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={progressTrend}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalDuration" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
  return (
  <div className="p-4 w-full overflow-x-hidden">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
      🏆 Top Studied Subject: <span className="text-blue-600">{topSubject}</span>
    </h3>

    {/* Weekly & Today Side-by-Side */}
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      <div className="flex-1 min-w-[300px]">{renderBarChart(weeklyData, '📊 Weekly Study Time by Subject')}</div>
      <div className="flex-1 min-w-[300px]">{renderBarChart(todayData, "📅 Today's Study Summary")}</div>
    </div>

    {/* Date Selector */}
    <div className="flex flex-wrap gap-4 items-end my-6">
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mr-2">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded mr-4"
        />
        <button
          onClick={fetchDateSummary}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Show Summary
        </button>
      </div>
    </div>

    {/* Date-based Summary & Priority Side-by-Side */}
    {selectedDate && (
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="flex-1 min-w-[300px]">{renderBarChart(dateData, `📅 Study Summary for ${selectedDate}`)}</div>
        <div className="flex-1 min-w-[300px]">{renderDailyPriorityPieChart()}</div>
      </div>
    )}

    {/* Performance & Trend Side-by-Side */}
    <div className="flex flex-col lg:flex-row gap-4 mt-6 w-full">
      <div className="flex-1 min-w-[300px]">{renderPerformancePieChart()}</div>
      <div className="flex-1 min-w-[300px]">{renderLineChart()}</div>
    </div>
        </div>
  );
};

export default SubjectAnalytics;


