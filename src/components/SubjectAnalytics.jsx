/*
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

    
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      <div className="flex-1 min-w-[300px]">{renderBarChart(weeklyData, '📊 Weekly Study Time by Subject')}</div>
      <div className="flex-1 min-w-[300px]">{renderBarChart(todayData, "📅 Today's Study Summary")}</div>
    </div>

  
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

    
    {selectedDate && (
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="flex-1 min-w-[300px]">{renderBarChart(dateData, `📅 Study Summary for ${selectedDate}`)}</div>
        <div className="flex-1 min-w-[300px]">{renderDailyPriorityPieChart()}</div>
      </div>
    )}

  
    <div className="flex flex-col lg:flex-row gap-4 mt-6 w-full">
      <div className="flex-1 min-w-[300px]">{renderPerformancePieChart()}</div>
      <div className="flex-1 min-w-[300px]">{renderLineChart()}</div>
    </div>
        </div>
  );
};

export default SubjectAnalytics;
*/
/*
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

const SubjectAnalytics = () => {
  const { user } = useUser();
  const [weeklyData, setWeeklyData] = useState([]);
  const [topSubject, setTopSubject] = useState({ subject: 'Loading...', duration: 0 });
  const [todayData, setTodayData] = useState([]);
  const [performanceBreakdown, setPerformanceBreakdown] = useState([]);
  const [dailyTrend, setDailyTrend] = useState([]);
  const [dailySubjectPriority, setDailySubjectPriority] = useState([]);

  // 📌 Fetch all summary data
  
  useEffect(() => {
    if (!user) return;

    const userId = user.id;
    console.log("✅ Clerk User ID:", userId);
   const fetchWeeklySummary = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/subject/week-summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });
        

        const json = await res.json();
        setWeeklyData(json);
        console.log("📊 Weekly Data:", json);

      } catch (err) {
        console.error('Weekly data fetch error', err);
      }
    };
    

    const fetchTopSubject = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/subject/top-subject', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });
        const json = await res.json();
        setTopSubject(json);
      } catch (err) {
        console.error('Top subject fetch error', err);
      }
    };

    const fetchTodaySummary = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/subject/today-summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });
        const json = await res.json();
        setTodayData(json);
      } catch (err) {
        console.error('Today fetch error', err);
      }
    };

    const fetchPerformanceBreakdown = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/subject/performance-breakdown', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });
        const json = await res.json();
        setPerformanceBreakdown(json);
      } catch (err) {
        console.error('Performance breakdown fetch error', err);
      }
    };

    const fetchDailyTrend = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/subject/daily-trend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });
        const json = await res.json();
        setDailyTrend(json);
      } catch (err) {
        console.error('Progress trend fetch error', err);
      }
    };

    fetchWeeklySummary();
    fetchTopSubject();
    fetchTodaySummary();
    fetchPerformanceBreakdown();
    fetchDailyTrend();
  }, [user]);
  
  

  // 📌 Fetch specific date priority
  const fetchDateSummary = async (date) => {
  try {
    const res = await fetch(`http://localhost:5000/api/subject/daily-priority`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, date }),
    });

    const json = await res.json();
    if (!Array.isArray(json)) {
      console.error("Unexpected response format:", json);
      setDailySubjectPriority([]);
      return;
    }

    setDailySubjectPriority(json);
  } catch (err) {
    console.error("Date summary fetch error:", err);
  }
};


  const renderDailyPriorityPieChart = () => {
    if (!dailySubjectPriority || dailySubjectPriority.length === 0) return null;
    return (
      <div className="w-full md:w-1/2 p-4">
        <h3 className="text-xl font-semibold mb-2">Daily Subject Priority</h3>
        <PieChart width={350} height={300}>
          <Pie
            dataKey="value"
            data={dailySubjectPriority}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {dailySubjectPriority.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    );
  };
  

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📊 Study Analytics Dashboard</h2>

      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Weekly Summary</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
{[...new Set(
  weeklyData.flatMap(obj =>
    Object.keys(obj).filter(key => key !== 'day').map(k => k.trim())
  )
)].map((subject, idx) => (
  <Bar key={subject} dataKey={subject} stackId="a" fill={COLORS[idx % COLORS.length]} />
))}

          </BarChart>
        </ResponsiveContainer>
      </div>

      
      <div className="mb-4">
        <h3 className="text-lg font-semibold">🔥 Top Studied Subject:</h3>
        <p>{topSubject.subject} - {topSubject.duration} mins</p>
      </div>

      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Today’s Work</h3>
        <ResponsiveContainer width="100%" height={250}>


      <BarChart data={todayData}>
  <XAxis dataKey="day" />
  <YAxis />
  <Tooltip />
  <Legend />
  {todayData.length > 0 &&
    Object.keys(todayData[0])
      .filter((key) => key !== "day")
      .map((subject, idx) => (
        <Bar key={subject} dataKey={subject} fill={COLORS[idx % COLORS.length]} />
      ))}
</BarChart>
        </ResponsiveContainer>
      </div>

      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">📈 Performance Breakdown</h3>
        <PieChart width={400} height={300}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={performanceBreakdown}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {performanceBreakdown.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">📅 Progress Trend (Daily Study Time)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dailyTrend}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="totalDuration" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      
      <div className="mb-4">
        <button
          onClick={() => {
            const today = new Date().toISOString().split('T')[0];
            fetchDateSummary(today);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Load Daily Priority
        </button>
        {renderDailyPriorityPieChart()}
      </div>
    </div>
  );
};

export default SubjectAnalytics;
*/
/*
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell,
  LineChart, Line, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#3b82f6', '#2563eb', '#1e40af', '#60a5fa'];

const SubjectAnalytics = () => {
  const { user } = useUser();
  const [weeklyData, setWeeklyData] = useState([]);
  const [topSubject, setTopSubject] = useState({ subject: 'Loading...', duration: 0 });
  const [todayData, setTodayData] = useState([]);
  const [performanceBreakdown, setPerformanceBreakdown] = useState([]);
  const [dailyTrend, setDailyTrend] = useState([]);
  const [dailySubjectPriority, setDailySubjectPriority] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [dateData, setDateData] = useState([]);

  useEffect(() => {
    if (!user) return;
    const userId = user.id;

    const fetchWeeklySummary = async () => {
      const res = await fetch('http://localhost:5000/api/subject/week-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      setWeeklyData(json);
    };

    const fetchTopSubject = async () => {
      const res = await fetch('http://localhost:5000/api/subject/top-subject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      setTopSubject(json);
    };

    const fetchTodaySummary = async () => {
      const res = await fetch('http://localhost:5000/api/subject/today-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      setTodayData(json);
    };

    const fetchPerformanceBreakdown = async () => {
      const res = await fetch('http://localhost:5000/api/subject/performance-breakdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      setPerformanceBreakdown(json);
    };

    const fetchDailyTrend = async () => {
      const res = await fetch('http://localhost:5000/api/subject/daily-trend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      setDailyTrend(json);
    };

    fetchWeeklySummary();
    fetchTopSubject();
    fetchTodaySummary();
    fetchPerformanceBreakdown();
    fetchDailyTrend();
  }, [user]);

  const fetchDateSummary = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/subject/date-summary?userId=${user.id}&date=${selectedDate}`);
      const json = await res.json();
      setDateData(json);
    } catch (err) {
      console.error("Date summary fetch error:", err);
    }

    try {
      const res = await fetch(`http://localhost:5000/api/subject/daily-priority`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, date: selectedDate }),
      });
      const json = await res.json();
      setDailySubjectPriority(json);
    } catch (err) {
      console.error("Priority fetch error:", err);
    }
  };

  const renderDailyPriorityPieChart = () => {
    if (!dailySubjectPriority || dailySubjectPriority.length === 0) return null;
    return (
      <PieChart width={350} height={300}>
        <Pie dataKey="value" data={dailySubjectPriority} cx="50%" cy="50%" outerRadius={100} label>
          {dailySubjectPriority.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    );
  };

  return (
    */
    /*
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📊 Study Analytics Dashboard</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Weekly Summary Bar Chart *
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Weekly Summary</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            {[...new Set(
              weeklyData.flatMap(obj =>
                Object.keys(obj).filter(key => key !== 'day').map(k => k.trim())
              )
            )].map((subject, idx) => (
              <Bar key={subject} dataKey={subject} stackId="a" fill={COLORS[idx % COLORS.length]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>



      {/* Today's Summary*
      <div className="mt-5">
        <h3 className="text-lg font-semibold mb-2">Today’s Work</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={todayData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            {todayData.length > 0 &&
              Object.keys(todayData[0])
                .filter((key) => key !== "day")
                .map((subject, idx) => (
                  <Bar key={subject} dataKey={subject} fill={COLORS[idx % COLORS.length]} />
                ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
</div>

            {/* Top Subject *
      <div className="mb-4">
        <h3 className="text-lg font-semibold">🔥 Top Studied Subject:</h3>
        <p>{topSubject.subject} - {topSubject.duration} mins</p>
      </div>


      {/* Progress Trend *
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">📅 Progress Trend (Daily Study Time)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dailyTrend}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="totalDuration" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Specific Date Summary and Priority *
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-4">📅 Get Specific Date Summary</h3>

    {/* Calendar + Load button side-by-side *
    <div className="flex flex-wrap gap-4 items-center mb-4">
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={() => {
          const today = new Date().toISOString().split('T')[0];
          setSelectedDate(today);
          setTimeout(fetchDateSummary, 0);
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Load Daily Priority
      </button>
    </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Show Bar Chart if dateData exists *
    {dateData.length > 0 && (
      <div className="mt-14">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dateData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.keys(dateData[0])
              .filter((key) => key !== 'day')
              .map((key, idx) => (
                <Bar key={key} dataKey={key} fill={COLORS[idx % COLORS.length]} />
              ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    )}

    {/* Show Pie Chart if data exists *
    <div className="mr-14">
      {dailySubjectPriority.length > 0 ? (
        renderDailyPriorityPieChart()
      ) : (
        <p className="text-gray-500">No data loaded yet. Click above to fetch.</p>
      )}
    </div>
  </div>
</div>
</div>

    </div>
  );
};

export default SubjectAnalytics;
*/


/*
<div className="min-h-screen bg-gradient-to-tr from-blue-100 via-purple-50 to-blue-100 p-6">
  <div className="max-w-screen-xl mx-auto">
    <h2 className="text-3xl font-bold mb-10 text-center text-blue-700">📊 Study Analytics Dashboard</h2>

    {/* Weekly + Today Charts *
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-blue-800">Weekly Summary</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            {[...new Set(
              weeklyData.flatMap(obj =>
                Object.keys(obj).filter(key => key !== 'day').map(k => k.trim())
              )
            )].map((subject, idx) => (
              <Bar key={subject} dataKey={subject} stackId="a" fill={COLORS[idx % COLORS.length]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-blue-800">Today’s Work</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={todayData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            {todayData.length > 0 &&
              Object.keys(todayData[0])
                .filter((key) => key !== "day")
                .map((subject, idx) => (
                  <Bar key={subject} dataKey={subject} fill={COLORS[idx % COLORS.length]} />
                ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Top Subject *
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h3 className="text-lg font-semibold text-blue-800">🔥 Top Studied Subject:</h3>
      <p className="text-gray-700 mt-2">{topSubject.subject} - {topSubject.duration} mins</p>
    </div>

    {/* Progress Trend *
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4 text-blue-800">📅 Progress Trend (Daily Study Time)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={dailyTrend}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="totalDuration" stroke="#3b82f6" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* Specific Date Summary & Priority *
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h3 className="text-lg font-semibold mb-6 text-blue-800">📅 Get Specific Date Summary</h3>

      <div className="flex flex-wrap gap-4 items-center mb-6">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-blue-300 p-2 rounded shadow-sm"
        />
        <button
          onClick={() => {
            const today = new Date().toISOString().split('T')[0];
            setSelectedDate(today);
            setTimeout(fetchDateSummary, 0);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow-md"
        >
          Load Daily Priority
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart *
        {dateData.length > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg shadow-inner">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dateData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                {Object.keys(dateData[0])
                  .filter((key) => key !== 'day')
                  .map((key, idx) => (
                    <Bar key={key} dataKey={key} fill={COLORS[idx % COLORS.length]} />
                  ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Pie Chart *
        <div className="bg-purple-50 p-4 rounded-lg shadow-inner">
          {dailySubjectPriority.length > 0 ? (
            renderDailyPriorityPieChart()
          ) : (
            <p className="text-gray-500">No data loaded yet. Click above to fetch.</p>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default SubjectAnalytics;
*/
/*
// ✅ At the very top
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell,
  LineChart, Line, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#3b82f6', '#2563eb', '#1e40af', '#60a5fa'];

const ChartToggle = ({ value, onChange }) => (
  <div className="flex gap-2 items-center bg-blue-50 px-2 py-1 rounded-full text-sm shadow-inner transition-all">
    <button
      onClick={() => onChange('bar')}
      className={`px-3 py-1 rounded-full transition ${
        value === 'bar' ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'
      }`}
    >
      📊 Bar
    </button>
    <button
      onClick={() => onChange('line')}
      className={`px-3 py-1 rounded-full transition ${
        value === 'line' ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'
      }`}
    >
      📈 Line
    </button>

<button
  onClick={() => onChange('bar')}
  className={`px-3 py-1 rounded-full transition ${
    value === 'bar' ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'
  }`}
>
  📊 Bar
</button>




<button
  onClick={() => onChange('pie')}
  className={`px-3 py-1 rounded-full transition ${
    value === 'pie' ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'
  }`}
>
  🥧 Pie
</button>


<button
  onClick={() => onChange('area')}
  className={`px-3 py-1 rounded-full transition ${
    value === 'area' ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'
  }`}
>
  🖍️ Area
</button>


<button
  onClick={() => onChange('radar')}
  className={`px-3 py-1 rounded-full transition ${
    value === 'radar' ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'
  }`}
>
  📡 Radar
</button>

  </div>
);

const SubjectAnalytics = () => {
  const { user } = useUser();
  const [weeklyData, setWeeklyData] = useState([]);
  const [topSubject, setTopSubject] = useState({ subject: 'Loading...', duration: 0 });
  const [todayData, setTodayData] = useState([]);
  const [dailyTrend, setDailyTrend] = useState([]);
  const [trendChartType, setTrendChartType] = useState('line');
  const [todayChartType, setTodayChartType] = useState('bar');
  const [weeklyChartType, setWeeklyChartType] = useState('bar');

  useEffect(() => {
    if (!user) return;
    const userId = user.id;

    const fetchWeeklySummary = async () => {
      const res = await fetch('http://localhost:5000/api/subject/week-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      setWeeklyData(json);
    };

    const fetchTopSubject = async () => {
      const res = await fetch('http://localhost:5000/api/subject/top-subject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      setTopSubject(json);
    };

    const fetchTodaySummary = async () => {
      const res = await fetch('http://localhost:5000/api/subject/today-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      setTodayData(json);
    };

    const fetchDailyTrend = async () => {
      const res = await fetch('http://localhost:5000/api/subject/daily-trend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      setDailyTrend(json);
    };

    fetchWeeklySummary();
    fetchTopSubject();
    fetchTodaySummary();
    fetchDailyTrend();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-purple-50 to-blue-100 p-6">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center text-blue-700">Study Analytics Dashboard</h2>

      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        
          <div className="bg-white rounded-xl shadow p-6 transition-transform hover:scale-[1.01]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-blue-800">Weekly Summary</h3>
              <ChartToggle value={weeklyChartType} onChange={setWeeklyChartType} />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              {weeklyChartType === 'bar' ? (
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {[...new Set(
                    weeklyData.flatMap(obj =>
                      Object.keys(obj).filter(key => key !== 'day')
                    )
                  )].map((subject, idx) => (
                    <Bar key={subject} dataKey={subject} stackId="a" fill={COLORS[idx % COLORS.length]} />
                  ))}
                </BarChart>
              ) : (
                <LineChart data={weeklyData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {[...new Set(
                    weeklyData.flatMap(obj =>
                      Object.keys(obj).filter(key => key !== 'day')
                    )
                  )].map((subject, idx) => (
                    <Line key={subject} dataKey={subject} stroke={COLORS[idx % COLORS.length]} strokeWidth={2} />
                  ))}
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          
          <div className="bg-white rounded-xl shadow p-6 transition-transform hover:scale-[1.01]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-blue-800">Today’s Work</h3>
              <ChartToggle value={todayChartType} onChange={setTodayChartType} />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              {todayChartType === 'bar' ? (
                <BarChart data={todayData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {todayData.length > 0 &&
                    Object.keys(todayData[0])
                      .filter(key => key !== 'day')
                      .map((subject, idx) => (
                        <Bar key={subject} dataKey={subject} fill={COLORS[idx % COLORS.length]} />
                      ))}
                </BarChart>
              ) : (
                <LineChart data={todayData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {todayData.length > 0 &&
                    Object.keys(todayData[0])
                      .filter(key => key !== 'day')
                      .map((subject, idx) => (
                        <Line key={subject} dataKey={subject} stroke={COLORS[idx % COLORS.length]} strokeWidth={2} />
                      ))}
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        
        <div className="bg-white rounded-xl shadow p-6 mb-8 transition-transform hover:scale-[1.01]">
          <h3 className="text-lg font-semibold text-blue-800">Top Studied Subject:</h3>
          <p className="text-gray-700 mt-2">{topSubject.subject} - {topSubject.duration} mins</p>
        </div>

        
        <div className="bg-white rounded-xl shadow p-6 mb-8 transition-transform hover:scale-[1.01]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-blue-800"> Progress Trend (Daily Study Time)</h3>
            <ChartToggle value={trendChartType} onChange={setTrendChartType} />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            {trendChartType === 'line' ? (
              <LineChart data={dailyTrend}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="totalDuration" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            ) : (
              <BarChart data={dailyTrend}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalDuration" fill="#3b82f6" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SubjectAnalytics;

*/

/*
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell,
  LineChart, Line, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#3b82f6', '#2563eb', '#1e40af', '#60a5fa'];

const ChartToggle = ({ value, onChange }) => (
  <div className="flex gap-2 items-center bg-blue-100 px-4 py-2 rounded-full text-sm shadow-inner justify-center mb-8">
    <button
      onClick={() => onChange('bar')}
      className={`px-3 py-1 rounded-full transition ${
        value === 'bar' ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'
      }`}
    >📊 Bar</button>
    <button
      onClick={() => onChange('line')}
      className={`px-3 py-1 rounded-full transition ${
        value === 'line' ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'
      }`}
    >📈 Line</button>
    <button
      onClick={() => onChange('pie')}
      className={`px-3 py-1 rounded-full transition ${
        value === 'pie' ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'
      }`}
    >🥧 Pie</button>
    <button
      onClick={() => onChange('area')}
      className={`px-3 py-1 rounded-full transition ${
        value === 'area' ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'
      }`}
    >🖍️ Area</button>
  </div>
);

const SubjectAnalytics = () => {
  const { user } = useUser();
  const [weeklyData, setWeeklyData] = useState([]);
  const [topSubject, setTopSubject] = useState({ subject: 'Loading...', duration: 0 });
  const [todayData, setTodayData] = useState([]);
  const [dailyTrend, setDailyTrend] = useState([]);
  const [chartType, setChartType] = useState('bar');

  useEffect(() => {
    if (!user) return;
    const userId = user.id;

    const fetchWeeklySummary = async () => {
      const res = await fetch('http://localhost:5000/api/subject/week-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      setWeeklyData(json);
    };

    const fetchTopSubject = async () => {
      const res = await fetch('http://localhost:5000/api/subject/top-subject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      setTopSubject(json);
    };

    const fetchTodaySummary = async () => {
      const res = await fetch('http://localhost:5000/api/subject/today-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      setTodayData(json);
    };

    const fetchDailyTrend = async () => {
      const res = await fetch('http://localhost:5000/api/subject/daily-trend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      setDailyTrend(json);
    };

    fetchWeeklySummary();
    fetchTopSubject();
    fetchTodaySummary();
    fetchDailyTrend();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-purple-50 to-blue-100 p-6">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center text-blue-700">Study Analytics Dashboard</h2>

        <ChartToggle value={chartType} onChange={setChartType} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">


          <div className="bg-white rounded-xl shadow p-6 transition-transform hover:scale-[1.01]">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">📅 Weekly Summary</h3>
            <ResponsiveContainer width="100%" height={300}>
              {chartType === 'line' ? (
                <LineChart data={weeklyData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {[...new Set(weeklyData.flatMap(obj => Object.keys(obj).filter(key => key !== 'day')))]
                    .map((subject, idx) => (
                      <Line key={subject} dataKey={subject} stroke={COLORS[idx % COLORS.length]} strokeWidth={2} />
                    ))}
                </LineChart>
              ) : (
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {[...new Set(weeklyData.flatMap(obj => Object.keys(obj).filter(key => key !== 'day')))]
                    .map((subject, idx) => (
                      <Bar key={subject} dataKey={subject} stackId="a" fill={COLORS[idx % COLORS.length]} />
                    ))}
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>


          <div className="bg-white rounded-xl shadow p-6 transition-transform hover:scale-[1.01]">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">📆 Today’s Work</h3>
            <ResponsiveContainer width="100%" height={300}>
              {chartType === 'line' ? (
                <LineChart data={todayData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {todayData.length > 0 &&
                    Object.keys(todayData[0]).filter(key => key !== 'day')
                      .map((subject, idx) => (
                        <Line key={subject} dataKey={subject} stroke={COLORS[idx % COLORS.length]} strokeWidth={2} />
                      ))}
                </LineChart>
              ) : (
                <BarChart data={todayData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {todayData.length > 0 &&
                    Object.keys(todayData[0]).filter(key => key !== 'day')
                      .map((subject, idx) => (
                        <Bar key={subject} dataKey={subject} fill={COLORS[idx % COLORS.length]} />
                      ))}
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

      
        <div className="bg-white rounded-xl shadow p-6 mb-8 transition-transform hover:scale-[1.01]">
          <h3 className="text-lg font-semibold text-blue-800">🔥 Top Studied Subject:</h3>
          <p className="text-gray-700 mt-2">{topSubject.subject} - {topSubject.duration} mins</p>
        </div>


        <div className="bg-white rounded-xl shadow p-6 mb-8 transition-transform hover:scale-[1.01]">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">📈 Progress Trend (Daily Study Time)</h3>
          <ResponsiveContainer width="100%" height={300}>
            {chartType === 'line' ? (
              <LineChart data={dailyTrend}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="totalDuration" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            ) : (
              <BarChart data={dailyTrend}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalDuration" fill="#3b82f6" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SubjectAnalytics;
*/

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell,
  LineChart, Line, AreaChart, Area, Legend, ResponsiveContainer
} from 'recharts';

/*const COLORS = [
  '#60A5FA', // Blue-400
  '#3B82F6', // Blue-500
  '#2563EB', // Blue-600
  '#1D4ED8', // Blue-700
  '#1E40AF', // Blue-800
  '#1E3A8A', // Blue-900
];
*/
const COLORS = [
  '#818CF8', // Indigo-400 (bluish-purple)
  '#6366F1', // Indigo-500
  '#4F46E5', // Indigo-600
  '#4338CA', // Indigo-700
  '#3730A3', // Indigo-800
  '#312E81', // Indigo-900
];



const ChartToggle = ({ value, onChange }) => (
  <div className="dark:text-white flex gap-2 items-center bg-white dark:bg-gray-800 rounded-full text-sm shadow-inner justify-center mb-8">
    <button
      onClick={() => onChange('bar')}
      className={`px-3 py-1 rounded-full transition ${
        value === 'bar' ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'
      }`}
    >📊 Bar</button>
    <button
      onClick={() => onChange('line')}
      className={`px-3 py-1 rounded-full transition ${
        value === 'line' ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'
      }`}
    >📈 Line</button>
    



  </div>
);

const SubjectAnalytics = () => {
  const { user } = useUser();
  const [weeklyData, setWeeklyData] = useState([]);
  const [topSubject, setTopSubject] = useState({ subject: 'Loading...', duration: 0 });
  const [todayData, setTodayData] = useState([]);
  const [dailyTrend, setDailyTrend] = useState([]);
  const [chartType, setChartType] = useState('bar');
  const [selectedDate, setSelectedDate] = useState('');
  const [dateData, setDateData] = useState([]);

  useEffect(() => {
    if (!user) return;
    const userId = user.id;

    const fetchWeeklySummary = async () => {
      const res = await fetch('http://localhost:5000/api/subject/week-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      setWeeklyData(json);
    };

    const fetchTopSubject = async () => {
      const res = await fetch('http://localhost:5000/api/subject/top-subject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      setTopSubject(json);
    };

    const fetchTodaySummary = async () => {
      const res = await fetch('http://localhost:5000/api/subject/today-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      setTodayData(json);
    };

    const fetchDailyTrend = async () => {
      const res = await fetch('http://localhost:5000/api/subject/daily-trend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const json = await res.json();
      setDailyTrend(json);
    };

    fetchWeeklySummary();
    fetchTopSubject();
    fetchTodaySummary();
    fetchDailyTrend();
  }, [user]);

  const fetchDateSummary = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/subject/date-summary?userId=${user.id}&date=${selectedDate}`);
      const json = await res.json();
      setDateData(json);
    } catch (err) {
      console.error("Date summary fetch error:", err);
    }
  };
  

  const renderChart = (data, isStacked = false) => {
    if (chartType === 'pie') {
      const keys = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'day') : [];
      return (
        <PieChart>
          {keys.map((key, idx) => (
            <Pie
              key={key}
              data={data.map(item => ({ name: item.day, value: item[key] }))}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill={COLORS[idx % COLORS.length]}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          ))}
          <Tooltip />
        </PieChart>
      );
    } else if (chartType === 'line') {
      return (
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          {[...new Set(data.flatMap(obj => Object.keys(obj).filter(key => key !== 'day')))]
            .map((key, idx) => (
              <Line key={key} dataKey={key} stroke={COLORS[idx % COLORS.length]} strokeWidth={2} />
            ))}
        </LineChart>
      );
    } else if (chartType === 'area') {
      return (
        <AreaChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          {[...new Set(data.flatMap(obj => Object.keys(obj).filter(key => key !== 'day')))]
            .map((key, idx) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={COLORS[idx % COLORS.length]}
                fill={COLORS[idx % COLORS.length]}
              />
            ))}
        </AreaChart>
      );
    } else {
      return (
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          {[...new Set(data.flatMap(obj => Object.keys(obj).filter(key => key !== 'day')))]
            .map((key, idx) => (
              <Bar key={key} dataKey={key} stackId={isStacked ? "a" : undefined} fill={COLORS[idx % COLORS.length]} />
            ))}
        </BarChart>
      );
    }
  };
  
    //<div className="min-h-screen bg-gradient-to-tr from-blue-50 via-purple-50 to-blue-100 p-6">

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center text-blue-700 dark:text-white">Study Analytics Dashboard</h2>

        <ChartToggle value={chartType} onChange={setChartType} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white dark:bg-gray-700 dark:text-white-100">
          <div className="dark:text-white rounded-xl shadow p-6 transition-transform hover:scale-[1.01]">
            <h3 className="text-lg font-semibold text-blue-800 mb-4 dark:text-white">📅 Weekly Summary</h3>
            <ResponsiveContainer width="100%" height={300}>
              {renderChart(weeklyData, true)}
            </ResponsiveContainer>
          </div>

          <div className=" rounded-xl bg-transparent shadow p-6 transition-transform hover:scale-[1.01] bg-white dark:bg-gray-700 dark:text-white-100">
            <h3 className="dark:text-white text-lg font-semibold text-blue-800 mb-4">📆 Today’s Work</h3>
            <ResponsiveContainer width="100%" height={300}>
              {renderChart(todayData)}
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 dark:text-white-100 rounded-xl shadow p-6 mb-8 transition-transform hover:scale-[1.01]">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-white">🔥 Top Studied Subject:</h3>
          <p className="text-gray-700 dark:text-white mt-2">{topSubject.subject} - {topSubject.duration} mins</p>
        </div>

        <div className="bg-white dark:bg-gray-700 dark:text-white-100 rounded-xl shadow p-6 mb-8 transition-transform hover:scale-[1.01]">
          <h3 className=" dark:text-white text-lg font-semibold text-blue-800 mb-4">📈 Progress Trend (Daily Study Time)</h3>
          <ResponsiveContainer width="100%" height={300}>
            {renderChart(dailyTrend)}
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-700 dark:text-white-100 rounded-xl shadow p-6 mb-8 transition-transform hover:scale-[1.01]">
          <h3 className="dark:text-white text-lg font-semibold text-blue-800 mb-4">📌 Get Specific Date Summary</h3>
          <div className="flex flex-wrap gap-4 mb-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border px-4 py-2 rounded shadow"
            />
            <button
              onClick={fetchDateSummary}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Load
            </button>
          </div>
          {dateData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              {renderChart(dateData)}
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 dark:text-white">No data loaded yet. Pick a date and click Load.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectAnalytics;



/*
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#3b82f6', '#2563eb', '#1e40af', '#60a5fa'];

const ChartToggle = ({ value, onChange }) => (
  <div className="flex gap-2 items-center bg-blue-100 px-4 py-2 rounded-full text-sm shadow-inner justify-center mb-8">
    <button
      onClick={() => onChange('bar')}
      className={`px-3 py-1 rounded-full transition ${
        value === 'bar' ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'
      }`}
    >📊 Bar</button>
    <button
      onClick={() => onChange('line')}
      className={`px-3 py-1 rounded-full transition ${
        value === 'line' ? 'bg-blue-600 text-white' : 'hover:bg-blue-200'
      }`}
    >📈 Line</button>
  </div>
);

const SubjectAnalytics = () => {
  const { user } = useUser();
  const [weeklyData, setWeeklyData] = useState([]);
  const [topSubject, setTopSubject] = useState({ subject: 'Loading...', duration: 0 });
  const [todayData, setTodayData] = useState([]);
  const [dailyTrend, setDailyTrend] = useState([]);
  const [chartType, setChartType] = useState('bar');
  const [selectedDate, setSelectedDate] = useState('');
  const [dateData, setDateData] = useState([]);

  useEffect(() => {
    if (!user) return;
    const userId = user.id;

    const fetchData = async () => {
      const [week, top, today, trend] = await Promise.all([
        fetch('http://localhost:5000/api/subject/week-summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        }).then(res => res.json()),
        fetch('http://localhost:5000/api/subject/top-subject', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        }).then(res => res.json()),
        fetch('http://localhost:5000/api/subject/today-summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        }).then(res => res.json()),
        fetch('http://localhost:5000/api/subject/daily-trend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        }).then(res => res.json()),
      ]);

      setWeeklyData(week);
      setTopSubject(top);
      setTodayData(today);
      setDailyTrend(trend);
    };

    fetchData();
  }, [user]);

  const fetchDateSummary = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/subject/date-summary?userId=${user.id}&date=${selectedDate}`);
      const json = await res.json();
      setDateData(json);
    } catch (err) {
      console.error("Date summary fetch error:", err);
    }
  };

  const renderChart = (data, isStacked = false) => {
    const keys = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'day') : [];

    if (chartType === 'line') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            {keys.map((key, idx) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={COLORS[idx % COLORS.length]}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          {keys.map((key, idx) => (
            <Bar
              key={key}
              dataKey={key}
              stackId={isStacked ? 'a' : undefined}
              fill={COLORS[idx % COLORS.length]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-purple-50 to-blue-100 p-6">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center text-blue-700">Study Analytics Dashboard</h2>

        <ChartToggle value={chartType} onChange={setChartType} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 transition-transform hover:scale-[1.01]">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">📅 Weekly Summary</h3>
            {renderChart(weeklyData, true)}
          </div>

          <div className="bg-white rounded-xl shadow p-6 transition-transform hover:scale-[1.01]">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">📆 Today’s Work</h3>
            {renderChart(todayData)}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-8 transition-transform hover:scale-[1.01]">
          <h3 className="text-lg font-semibold text-blue-800">🔥 Top Studied Subject:</h3>
          <p className="text-gray-700 mt-2">{topSubject.subject} - {topSubject.duration} mins</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-8 transition-transform hover:scale-[1.01]">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">📈 Progress Trend (Daily Study Time)</h3>
          {renderChart(dailyTrend)}
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-8 transition-transform hover:scale-[1.01]">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">📌 Get Specific Date Summary</h3>
          <div className="flex flex-wrap gap-4 mb-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border px-4 py-2 rounded shadow"
            />
            <button
              onClick={fetchDateSummary}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Load
            </button>
          </div>
          {dateData.length > 0 ? (
            renderChart(dateData)
          ) : (
            <p className="text-gray-500">No data loaded yet. Pick a date and click Load.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectAnalytics;
*/
