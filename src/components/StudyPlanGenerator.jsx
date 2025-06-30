/*
import React, { useEffect, useState } from 'react';
import { generateStudyPlan } from '../utils/aiPlanner';
import TodaySuggestion from './TodaySuggestion';

const StudyPlanGenerator = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [aiPlan, setAiPlan] = useState("Generating study plan...");

  useEffect(() => {
    const fetchDataAndGenerate = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/subject/week-summary");
        const data = await res.json();
        setWeeklyData(data);
        const plan = await generateStudyPlan(data);
        setAiPlan(plan);
      } catch (err) {
        console.error("Error:", err);
        setAiPlan("❌ Failed to fetch data or generate plan.");
      }
    };

    fetchDataAndGenerate();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-white rounded-xl shadow-lg">
      <div className="whitespace-pre-wrap font-mono">
        <h2 className="text-xl font-bold mb-4 text-indigo-700">📅 AI-Generated Weekly Study Plan</h2>
        {aiPlan}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <TodaySuggestion />
      </div>
    </div>
  );
};

// ✅ Make sure this is inside the file, not after a return block
export default StudyPlanGenerator;

*/

/*
import React, { useEffect, useState } from 'react';
import { generateStudyPlan } from '../utils/aiPlanner';
import TodaySuggestion from './TodaySuggestion';
import StudyCalendar from './StudyCalendar'; // ✅ added

const StudyPlanGenerator = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [aiPlan, setAiPlan] = useState("Generating study plan...");

  useEffect(() => {
    const fetchDataAndGenerate = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/subject/week-summary");
        const data = await res.json();
        setWeeklyData(data);
        const plan = await generateStudyPlan(data);
        setAiPlan(plan);
      } catch (err) {
        console.error("Error:", err);
        setAiPlan("❌ Failed to fetch data or generate plan.");
      }
    };

    fetchDataAndGenerate();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-white rounded-xl shadow-lg">
      <div>
        <h2 className="text-xl font-bold mb-4 text-indigo-700">📅 AI-Generated Weekly Study Plan</h2>
        {Array.isArray(aiPlan) ? (
          <StudyCalendar data={aiPlan} />
        ) : (
          <p className="text-red-500">{aiPlan}</p>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <TodaySuggestion />
      </div>
    </div>
  );
};

export default StudyPlanGenerator;
*/
/*
import React, { useEffect, useState } from 'react';
import { generateStudyPlan } from '../utils/aiPlanner';
import TodaySuggestion from './TodaySuggestion';
import StudyCalendar from './StudyCalendar';

const StudyPlanGenerator = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [aiPlan, setAiPlan] = useState('Generating study plan...');
  const [weekOffset, setWeekOffset] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);

  useEffect(() => {
    const fetchDataAndGenerate = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/subject/week-summary?offset=${weekOffset}`);
        const data = await res.json();
        setWeeklyData(data);

        // Calculate total minutes for display
        let total = 0;
        data.forEach(day => {
          Object.keys(day).forEach(subject => {
            if (subject !== 'day') total += day[subject];
          });
        });
        setTotalMinutes(total);

        const plan = await generateStudyPlan(data);
        setAiPlan(plan);
      } catch (err) {
        console.error('Error:', err);
        setAiPlan('❌ Failed to fetch data or generate plan.');
      }
    };

    fetchDataAndGenerate();
  }, [weekOffset]);

  const totalHours = Math.floor(totalMinutes / 60);
  const totalMins = totalMinutes % 60;

  return (
    <div className="p-6 space-y-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <button onClick={() => setWeekOffset(weekOffset - 1)} className="text-sm px-3 py-1 bg-purple-200 rounded">
          ⬅️ Previous Week
        </button>
        <p className="font-semibold text-gray-700">Week {weekOffset === 0 ? '(This Week)' : `Offset: ${weekOffset}`}</p>
        <button onClick={() => setWeekOffset(weekOffset + 1)} className="text-sm px-3 py-1 bg-blue-200 rounded">
          Next Week ➡️
        </button>
      </div>

      <div className="whitespace-pre-wrap font-mono">
        <h2 className="text-xl font-bold mb-2 text-indigo-700">📅 AI-Generated Weekly Study Plan</h2>
        {Array.isArray(aiPlan) ? (
          <StudyCalendar data={aiPlan} />
        ) : (
          <p>{aiPlan}</p>
        )}
        <div className="mt-4 text-sm text-gray-600">
          ⏱️ Total Study Time: {totalHours}h {totalMins}m
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <TodaySuggestion />
      </div>
    </div>
  );
};

export default StudyPlanGenerator;
*/
/*
import React, { useEffect, useState } from 'react';
import { generateStudyPlan } from '../utils/aiPlanner';
import TodaySuggestion from './TodaySuggestion';
import StudyCalendar from './StudyCalendar';

const StudyPlanGenerator = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [aiPlan, setAiPlan] = useState('Generating study plan...');
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [revisionTopics, setRevisionTopics] = useState(['Binary Trees', 'SQL Joins', 'Greedy Algorithms']);

  useEffect(() => {
    const fetchDataAndGenerate = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/subject/week-summary`);
        const data = await res.json();
        setWeeklyData(data);

        let total = 0;
        data.forEach(day => {
          Object.keys(day).forEach(subject => {
            if (subject !== 'day') total += day[subject];
          });
        });
        setTotalMinutes(total);

        const plan = await generateStudyPlan(data);
        setAiPlan(plan);
      } catch (err) {
        console.error('Error:', err);
        setAiPlan('❌ Failed to fetch data or generate plan.');
      }
    };

    fetchDataAndGenerate();
  }, []);

  const totalHours = Math.floor(totalMinutes / 60);
  const totalMins = totalMinutes % 60;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  const startDate = new Date();
  const dayOfWeek = startDate.getDay();
  startDate.setDate(startDate.getDate() - dayOfWeek);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  const weekRange = `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

  return (
    <div className="p-6 space-y-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-gray-700">📅 Today: {today}</p>
        <p className="text-sm text-gray-500">🗓️ Week: {weekRange}</p>
      </div>

      <div className="whitespace-pre-wrap font-mono">
        <h2 className="text-xl font-bold mb-2 text-indigo-700">📅 AI-Generated Weekly Study Plan</h2>
        {Array.isArray(aiPlan) ? (
          <StudyCalendar data={aiPlan} />
        ) : (
          <p>{aiPlan}</p>
        )}
        <div className="mt-4 text-sm text-gray-600">
          ⏱️ Total Study Time: {totalHours}h {totalMins}m
        </div>
        <div className="mt-4 text-sm text-blue-800 bg-blue-50 p-3 rounded">
          💡 <strong>Smart Tip:</strong> Revise short notes before sleep & practice spaced repetition!
        </div>
        <div className="mt-4 text-sm text-purple-800 bg-purple-50 p-3 rounded">
          📘 <strong>Revision Topics:</strong>
          <ul className="list-disc ml-5 mt-1">
            {revisionTopics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <TodaySuggestion />
      </div>
    </div>
  );
};

export default StudyPlanGenerator;
*/

/*
import React, { useEffect, useState } from 'react';
import { generateStudyPlan } from '../utils/aiPlanner';
import TodaySuggestion from './TodaySuggestion';
import StudyCalendar from './StudyCalendar';

const StudyPlanGenerator = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [aiPlan, setAiPlan] = useState('Generating study plan...');
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [revisionTopics, setRevisionTopics] = useState([]);

  useEffect(() => {
    const fetchDataAndGenerate = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/subject/week-summary`);
        const data = await res.json();
        setWeeklyData(data);

        let total = 0;
        data.forEach(day => {
          Object.keys(day).forEach(subject => {
            if (subject !== 'day') total += day[subject];
          });
        });
        setTotalMinutes(total);

        const plan = await generateStudyPlan(data);
        setAiPlan(plan);
      } catch (err) {
        console.error('Error:', err);
        setAiPlan('❌ Failed to fetch data or generate plan.');
      }
    };

    const fetchRevisionTopics = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/revision-topics");
        const topics = await res.json();
        setRevisionTopics(topics);
      } catch (err) {
        console.error("Error fetching revision topics:", err);
        setRevisionTopics(["Binary Trees", "SQL Joins", "Greedy Algorithms"]); // fallback
      }
    };

    fetchDataAndGenerate();
    fetchRevisionTopics();
  }, []);

  const totalHours = Math.floor(totalMinutes / 60);
  const totalMins = totalMinutes % 60;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  const startDate = new Date();
  const dayOfWeek = startDate.getDay();
  startDate.setDate(startDate.getDate() - dayOfWeek);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  const weekRange = `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

  return (
    <div className="p-6 space-y-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-gray-700">📅 Today: {today}</p>
        <p className="text-sm text-gray-500">🗓️ Week: {weekRange}</p>
      </div>

      <div className="whitespace-pre-wrap font-mono">
        <h2 className="text-xl font-bold mb-2 text-indigo-700">📅 AI-Generated Weekly Study Plan</h2>
        {Array.isArray(aiPlan) ? (
          <StudyCalendar data={aiPlan} />
        ) : (
          <p>{aiPlan}</p>
        )}
        <div className="mt-4 text-sm text-gray-600">
          ⏱️ Total Study Time: {totalHours}h {totalMins}m
        </div>
        <div className="mt-4 text-sm text-blue-800 bg-blue-50 p-3 rounded">
          💡 <strong>Smart Tip:</strong> Revise short notes before sleep & practice spaced repetition!
        </div>
        <div className="mt-4 text-sm text-purple-800 bg-purple-50 p-3 rounded">
          📘 <strong>Revision Topics:</strong>
          <ul className="list-disc ml-5 mt-1">
            {revisionTopics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <TodaySuggestion />
      </div>
    </div>
  );
};

export default StudyPlanGenerator;
*/
/*
import React, { useEffect, useState } from 'react';
import { generateStudyPlan } from '../utils/aiPlanner';
import TodaySuggestion from './TodaySuggestion';
import StudyCalendar from './StudyCalendar';

const StudyPlanGenerator = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [aiPlan, setAiPlan] = useState('Generating study plan...');
  const [totalMinutes, setTotalMinutes] = useState(0);

  useEffect(() => {
    const fetchDataAndGenerate = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/subject/week-summary`);
        const data = await res.json();
        setWeeklyData(data);

        let total = 0;
        data.forEach(day => {
          Object.keys(day).forEach(subject => {
            if (subject !== 'day') total += day[subject];
          });
        });
        setTotalMinutes(total);

        const plan = await generateStudyPlan(data);
        setAiPlan(plan);
      } catch (err) {
        console.error('Error:', err);
        setAiPlan('❌ Failed to fetch data or generate plan.');
      }
    };

    fetchDataAndGenerate();
  }, []);

  const totalHours = Math.floor(totalMinutes / 60);
  const totalMins = totalMinutes % 60;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  const startDate = new Date();
  const dayOfWeek = startDate.getDay();
  startDate.setDate(startDate.getDate() - dayOfWeek);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  const weekRange = `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

  return (
    <div className="p-6 space-y-6 bg-white-200 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-2 ">
        <p className="font-semibold text-gray-700 ">📅 Today: {today}</p>
        <p className="text-sm text-gray-500">🗓️ Week: {weekRange}</p>
      </div>

      <div className="whitespace-pre-wrap font-mono ">
        <h2 className="text-xl font-bold mb-2  text-indigo-700">📅 AI-Generated Weekly Study Plan</h2>
        <div >{Array.isArray(aiPlan) ? (
          <StudyCalendar data={aiPlan} />
        ) : (
          <p className='bg-green-200'>{aiPlan}</p>
        )}
        </div>
        <div className="mt-4 text-sm text-gray-600">
          ⏱️ Total Study Time: {totalHours}h {totalMins}m
        </div>
        <div className="mt-4 text-sm text-blue-800 bg-blue-50 p-3 rounded">
          💡 <strong>Smart Tip:</strong> Revise short notes before sleep & practice spaced repetition!
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <TodaySuggestion />
      </div>
    </div>
  );
};

export default StudyPlanGenerator;
*/

/*
import React, { useEffect, useState } from 'react';
import { generateStudyPlan } from '../utils/aiPlanner';
import TodaySuggestion from './TodaySuggestion';
import StudyCalendar from './StudyCalendar';

const StudyPlanGenerator = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [aiPlan, setAiPlan] = useState('Generating study plan...');
  const [totalMinutes, setTotalMinutes] = useState(0);

  useEffect(() => {
    const fetchDataAndGenerate = async () => {
      try {
        
        const res = await fetch("http://localhost:5000/api/subject/week-summary", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ userId }) // userId must be defined earlier
});

        const data = await res.json();
        setWeeklyData(data);

        let total = 0;
        data.forEach(day => {
          Object.keys(day).forEach(subject => {
            if (subject !== 'day') total += day[subject];
          });
        });
        setTotalMinutes(total);

        const plan = await generateStudyPlan(data);
        setAiPlan(plan);
      } catch (err) {
        console.error('Error:', err);
        setAiPlan('❌ Failed to fetch data or generate plan.');
      }
    };

    fetchDataAndGenerate();
  }, []);

  const totalHours = Math.floor(totalMinutes / 60);
  const totalMins = totalMinutes % 60;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  const startDate = new Date();
  const dayOfWeek = startDate.getDay();
  startDate.setDate(startDate.getDate() - dayOfWeek);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  const weekRange = `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

  return (
    /*
    <div className="p-6 bg-gray-50 ">
      <div className="flex justify-between items-center mb-4">
        <p className="font-semibold text-gray-700">📅 Today: {today}</p>
        <p className="text-sm text-gray-500">🗓️ Week: {weekRange}</p>
      </div>



        <div className="grid grid-cols-[40%_60%] gap-4" style={{ height: '50px' }}>


        <div className="bg-gradient-to-br from-blue-200 to-blue-50 text-white p-6 rounded-xl shadow-xl ">
          <h2 className="text-xl font-bold mb-4">🌟 AI Suggestion for Tomorrow</h2>
          <TodaySuggestion className="h-[200px]" />
        </div>


        <div className="bg-blue-200 to-blue-50 p-6 rounded-xl shadow-xl whitespace-pre-wrap font-mono">
          <h2 className="text-xl font-bold mb-2 text-indigo-700">📅 AI-Generated Weekly Study Plan</h2>
          {Array.isArray(aiPlan) ? (
            <StudyCalendar data={aiPlan} />
          ) : (
            <p className='bg-green-200 p-2 rounded'>{aiPlan}</p>
          )}
          <div className="mt-4 text-sm text-gray-600">
            ⏱️ Total Study Time: {totalHours}h {totalMins}m
          </div>
          <div className="mt-4 text-sm text-blue-800 bg-blue-50 p-3 rounded">
            💡 <strong>Smart Tip:</strong> Revise short notes before sleep & practice spaced repetition!
          </div>
        </div>

      </div>
    </div>
    */
   /*
   <div className="grid grid-cols-[40%_60%] gap-4" style={{ height: '600px' }}>
  {/* Left - Today Suggestion 
  <div className="bg-gradient-to-br from-blue-200 to-blue-50 text-white p-4 rounded-xl shadow-xl h-full overflow-y-auto">
    <h2 className="text-xl font-bold mb-4">🌟 AI Suggestion for Tomorrow</h2>
    <div className="h-full">
      <TodaySuggestion />
    </div>
  </div>

  
  <div className="bg-blue-200 p-4 rounded-xl shadow-xl whitespace-pre-wrap font-mono h-full overflow-y-auto">
    <h2 className="text-xl font-bold mb-2 text-indigo-700">📅 AI-Generated Weekly Study Plan</h2>
    {Array.isArray(aiPlan) ? (
      <StudyCalendar data={aiPlan} />
    ) : (
      <p className=" p-2 rounded">{aiPlan}</p>
    )}
    <div className="mt-4 text-sm text-gray-600">
      ⏱️ Total Study Time: {totalHours}h {totalMins}m
    </div>
    <div className="mt-4 text-sm text-blue-800 bg-blue-50 p-3 rounded">
      💡 <strong>Smart Tip:</strong> Revise short notes before sleep & practice spaced repetition!
    </div>
  </div>
</div>


  );
};

export default StudyPlanGenerator;
*/
/*
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import {  generateTodaySuggestion} from '../utils/generateTodaySuggestion';

const StudyPlanGenerator = () => {
  const { user } = useUser();
  const userId = user?.id;

  const [studyPlan, setStudyPlan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchDataAndGenerate = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/subject/week-summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId })
        });

        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }

        const weeklyData = await res.json();
        console.log("📊 Weekly Data:", weeklyData);

        const plan = await generateStudyPlan(weeklyData);
        setStudyPlan(plan);
        setLoading(false);
      } catch (error) {
        console.error("❌ Study Plan Generator Error:", error);
        setLoading(false);
      }
    };

    fetchDataAndGenerate();
  }, [userId]);

  if (loading) return <p>Generating study plan...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🧠 AI-Generated Study Plan</h2>
      <ul className="space-y-2">
        {studyPlan.map((entry, index) => (
          <li key={index} className="border p-2 rounded shadow">
            <strong>{entry.day}:</strong> {entry.subject} - {entry.duration} min
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudyPlanGenerator;
*/


/*
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { generateStudyPlan } from '../utils/aiPlanner';

const StudyPlanGenerator = () => {
  const { user } = useUser();
  const userId = user?.id;

  const [studyPlan, setStudyPlan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchDataAndGenerate = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/subject/week-summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId })
        });

        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }

        const weeklyData = await res.json();
        console.log("📊 Weekly Data:", weeklyData);

        const plan = await generateStudyPlan(weeklyData);
        setStudyPlan(plan);
      } catch (error) {
        console.error("❌ Study Plan Generator Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndGenerate();
  }, [userId]);

  if (loading) return <p>⏳ Generating your study plan...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🧠 AI-Generated Study Plan</h2>
      <ul className="space-y-2">
        {studyPlan.map((entry, index) => (
          <li key={index} className="border p-2 rounded shadow">
            <strong>{entry.day}:</strong> {entry.subject} - {entry.duration} min
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudyPlanGenerator;
*/
/*
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { generateStudyPlan } from '../utils/aiPlanner';

const StudyPlanGenerator = () => {
  const { user } = useUser();
  const userId = user?.id;

  const [studyPlan, setStudyPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMinutes, setTotalMinutes] = useState(0);

  useEffect(() => {
    if (!userId) return;

    const subjectColors = {
  Math: 'from-blue-400 to-blue-600',
  Science: 'from-green-400 to-green-600',
  English: 'from-pink-400 to-pink-600',
  History: 'from-yellow-400 to-yellow-600',
  Geography: 'from-teal-400 to-teal-600',
  Reasoning: 'from-purple-400 to-purple-600',
  Computer: 'from-indigo-400 to-indigo-600',
  Default: 'from-gray-300 to-gray-500',
};


    const fetchDataAndGenerate = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/subject/week-summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId })
        });

        if (!res.ok) throw new Error(`Server responded with ${res.status}`);

        const weeklyData = await res.json();

        let total = 0;
        weeklyData.forEach(day =>
          Object.keys(day).forEach(subject => {
            if (subject !== 'day') total += day[subject];
          })
        );
        setTotalMinutes(total);

        const plan = await generateStudyPlan(weeklyData);
        setStudyPlan(plan);
      } catch (error) {
        console.error("❌ Study Plan Generator Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndGenerate();
  }, [userId]);

  if (loading) return <p>⏳ Generating your study plan...</p>;

  const totalHours = Math.floor(totalMinutes / 60);
  const totalMins = totalMinutes % 60;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">📅 AI-Generated Weekly Study Plan</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {studyPlan.map((entry, index) => (
         /* <div
            key={index}
            className="bg-white border border-blue-200 rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <h3 className="font-semibold text-blue-800 mb-1">{entry.day}</h3>
            <p className="text-gray-700">{entry.subject}</p>
            <p className="text-sm text-gray-500">{entry.duration} minutes</p>
          </div>
          */
         /*
         const gradientClass =
  subjectColors[entry.subject] || subjectColors.Default;

<div
  key={index}
  className={`text-white rounded-lg p-4 shadow hover:shadow-lg transition bg-gradient-to-br ${gradientClass}`}
>
  <h3 className="font-semibold text-lg mb-1">{entry.day}</h3>
  <p className="text-sm">{entry.subject}</p>
  <p className="text-xs">{entry.duration} minutes</p>
</div>

        
      </div>

      <div className="mt-6 text-sm text-gray-700 text-center">
        ⏱️ Total Study Time: <strong>{totalHours}h {totalMins}m</strong>
      </div>
    </div>
  );
};

export default StudyPlanGenerator;
*/
/*
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { generateStudyPlan } from '../utils/aiPlanner';

// 🎨 Subject-based gradient colors
const subjectColors = {
  Math: 'from-blue-400 to-blue-600',
  Science: 'from-green-400 to-green-600',
  English: 'from-pink-400 to-pink-600',
  History: 'from-yellow-400 to-yellow-600',
  Geography: 'from-teal-400 to-teal-600',
  Reasoning: 'from-purple-400 to-purple-600',
  Computer: 'from-indigo-400 to-indigo-600',
  Default: 'from-gray-300 to-gray-500',
};

const StudyPlanGenerator = () => {
  const { user } = useUser();
  const userId = user?.id;

  const [studyPlan, setStudyPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMinutes, setTotalMinutes] = useState(0);

  useEffect(() => {
    if (!userId) return;

    const fetchDataAndGenerate = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/subject/week-summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId })
        });

        if (!res.ok) throw new Error(`Server responded with ${res.status}`);

        const weeklyData = await res.json();

        let total = 0;
        weeklyData.forEach(day =>
          Object.keys(day).forEach(subject => {
            if (subject !== 'day') total += day[subject];
          })
        );
        setTotalMinutes(total);

        const plan = await generateStudyPlan(weeklyData);
        setStudyPlan(plan);
      } catch (error) {
        console.error("❌ Study Plan Generator Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndGenerate();
  }, [userId]);

  if (loading) return <p>⏳ Generating your study plan...</p>;

  const totalHours = Math.floor(totalMinutes / 60);
  const totalMins = totalMinutes % 60;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">📅 AI-Generated Weekly Study Plan</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {studyPlan.map((entry, index) => {
          const gradientClass = subjectColors[entry.subject] || subjectColors.Default;

          return (
            <div
              key={index}
              className={`text-white rounded-lg p-4 shadow hover:shadow-lg transition bg-gradient-to-br ${gradientClass}`}
            >
              <h3 className="font-semibold text-lg mb-1">{entry.day}</h3>
              <p className="text-sm">{entry.subject}</p>
              <p className="text-xs">{entry.duration} minutes</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-sm text-gray-700 text-center">
        ⏱️ Total Study Time: <strong>{totalHours}h {totalMins}m</strong>
      </div>
    </div>
  );
};

export default StudyPlanGenerator;
*/
/*
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { generateStudyPlan } from '../utils/aiPlanner';

// 🎨 Subject-based gradient colors
const subjectColors = {
  Math: 'from-blue-400 to-blue-600',
  Science: 'from-green-400 to-green-600',
  English: 'from-pink-400 to-pink-600',
  History: 'from-yellow-400 to-yellow-600',
  Geography: 'from-teal-400 to-teal-600',
  Reasoning: 'from-purple-400 to-purple-600',
  Computer: 'from-indigo-400 to-indigo-600',
  Default: 'from-gray-300 to-gray-500',
};

const StudyPlanGenerator = () => {
  const { user } = useUser();
  const userId = user?.id;

  const [studyPlan, setStudyPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMinutes, setTotalMinutes] = useState(0);

  useEffect(() => {
    if (!userId) return;

    const fetchDataAndGenerate = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/subject/week-summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId })
        });

        if (!res.ok) throw new Error(`Server responded with ${res.status}`);

        const weeklyData = await res.json();

        let total = 0;
        weeklyData.forEach(day =>
          Object.keys(day).forEach(subject => {
            if (subject !== 'day') total += day[subject];
          })
        );
        setTotalMinutes(total);

        const plan = await generateStudyPlan(weeklyData);
        setStudyPlan(plan);
      } catch (error) {
        console.error("❌ Study Plan Generator Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndGenerate();
  }, [userId]);

  if (loading) return <p>⏳ Generating your study plan...</p>;

  const totalHours = Math.floor(totalMinutes / 60);
  const totalMins = totalMinutes % 60;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">📅 AI-Generated Weekly Study Plan</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {studyPlan.map((entry, index) => {
          const gradientClass = subjectColors[entry.subject] || subjectColors.Default;

          return (
            <div
              key={index}
              className={`text-white rounded-lg p-4 shadow hover:shadow-lg transition bg-gradient-to-br ${gradientClass}`}
            >
              <h3 className="font-semibold text-lg mb-1">{entry.day}</h3>
              <p className="text-sm">{entry.subject}</p>
              <p className="text-xs">{entry.duration} minutes</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-sm text-gray-700 text-center">
        ⏱️ Total Study Time: <strong>{totalHours}h {totalMins}m</strong>
      </div>
    </div>
  );
};

export default StudyPlanGenerator;
*/
/*
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { generateStudyPlan } from '../utils/aiPlanner';

// 🎨 Dynamic color palette
const gradientPool = [
  'from-blue-400 to-blue-600',
  'from-green-400 to-green-600',
  'from-purple-400 to-purple-600',
  'from-pink-400 to-pink-600',
  'from-yellow-400 to-yellow-600',
  'from-indigo-400 to-indigo-600',
  'from-red-400 to-red-600',
  'from-cyan-400 to-cyan-600',
  'from-rose-400 to-rose-600',
];

const subjectColorMap = {};
let colorIndex = 0;

const getSubjectColor = (subject) => {
  if (subjectColorMap[subject]) return subjectColorMap[subject];
  const gradient = gradientPool[colorIndex % gradientPool.length];
  subjectColorMap[subject] = gradient;
  colorIndex++;
  return gradient;
};

const StudyPlanGenerator = () => {
  const { user } = useUser();
  const userId = user?.id;

  const [studyPlan, setStudyPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMinutes, setTotalMinutes] = useState(0);

  const getWeekRange = () => {
    const start = new Date();
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Monday
    const startDate = new Date(start.setDate(diff));
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return {
      start: startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      end: endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  };

  useEffect(() => {
    if (!userId) return;

    const fetchDataAndGenerate = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/subject/week-summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId })
        });

        if (!res.ok) throw new Error(`Server responded with ${res.status}`);

        const weeklyData = await res.json();

        let total = 0;
        weeklyData.forEach(day =>
          Object.keys(day).forEach(subject => {
            if (subject !== 'day') total += day[subject];
          })
        );
        setTotalMinutes(total);

        const rawPlan = await generateStudyPlan(weeklyData);

        // Group by day
        const merged = {};
        rawPlan.forEach(({ day, subject, duration }) => {
          if (!merged[day]) merged[day] = [];
          merged[day].push({ subject, duration });
        });

        const groupedPlan = Object.entries(merged).map(([day, subjects]) => ({
          day,
          subjects
        }));

        setStudyPlan(groupedPlan);
      } catch (error) {
        console.error("❌ Study Plan Generator Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndGenerate();
  }, [userId]);

  if (loading) return <p className="text-center py-10">⏳ Generating your study plan...</p>;

  const totalHours = Math.floor(totalMinutes / 60);
  const totalMins = totalMinutes % 60;
  const { start, end } = getWeekRange();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-700 mb-1 text-center">📅 AI-Generated Weekly Study Plan</h2>
      <p className="text-center text-gray-600 mb-6">🗓️ Week: {start} - {end}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {studyPlan.map((entry, index) => {
          const gradientClass = getSubjectColor(entry.subjects[0]?.subject);

          return (
            <div
              key={index}
              className={`text-white rounded-lg p-4 shadow hover:shadow-lg transition bg-gradient-to-br ${gradientClass}`}
            >
              <h3 className="font-semibold text-lg mb-2">{entry.day}</h3>
              {entry.subjects.map((s, i) => (
                <p key={i} className="text-sm">
                  📘 {s.subject} - {s.duration} min
                </p>
              ))}
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-sm text-gray-700 text-center">
        ⏱️ Total Study Time: <strong>{totalHours}h {totalMins}m</strong>
      </div>
    </div>
  );
};

export default StudyPlanGenerator;
*/



import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { generateStudyPlan } from '../utils/aiPlanner';
import { generateTodaySuggestion } from '../utils/generateTodaySuggestion';
import html2pdf from 'html2pdf.js';

// 🎨 Color palette
const gradientPool = [
  'from-blue-400 to-blue-600',
  'from-blue-500 to-blue-700',
  'from-blue-300 to-blue-500',
  'from-cyan-400 to-blue-600',
  'from-sky-400 to-sky-600',
  'from-indigo-400 to-indigo-600',
  'from-blue-200 to-blue-400',
  'from-blue-600 to-indigo-700',
  'from-blue-300 to-indigo-500'
];


const subjectColorMap = {};
let colorIndex = 0;
const getSubjectColor = (subject) => {
  if (subjectColorMap[subject]) return subjectColorMap[subject];
  const gradient = gradientPool[colorIndex % gradientPool.length];
  subjectColorMap[subject] = gradient;
  colorIndex++;
  return gradient;
};

const StudyPlanDashboard = () => {
  const { user } = useUser();
  const userId = user?.id;

  const [studyPlan, setStudyPlan] = useState([]);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [totalMinutes, setTotalMinutes] = useState(0);

  const [suggestion, setSuggestion] = useState('');
  const [loadingSuggestion, setLoadingSuggestion] = useState(true);

  const pdfRef = useRef();

  const getWeekRange = () => {
    const start = new Date();
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Monday
    const startDate = new Date(start.setDate(diff));
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return {
      start: startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      end: endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  };

  // 🧠 Fetch AI Suggestion
  const loadSuggestion = async () => {
    if (!userId) return;
    setLoadingSuggestion(true);
    try {
      const res = await fetch("http://localhost:5000/api/subject/today-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const todayData = await res.json();
      const aiSuggestion = await generateTodaySuggestion(todayData);
      setSuggestion(aiSuggestion);
    } catch (err) {
      console.error("❌ Suggestion Error:", err);
      setSuggestion("Failed to load AI suggestion.");
    } finally {
      setLoadingSuggestion(false);
    }
  };

  // 📅 Fetch Weekly Plan
  useEffect(() => {
    if (!userId) return;

    const fetchWeeklyPlan = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/subject/week-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        const weeklyData = await res.json();

        let total = 0;
        weeklyData.forEach(day =>
          Object.keys(day).forEach(subject => {
            if (subject !== 'day') total += day[subject];
          })
        );
        setTotalMinutes(total);

        const rawPlan = await generateStudyPlan(weeklyData);

        const merged = {};
        rawPlan.forEach(({ day, subject, duration }) => {
          if (!merged[day]) merged[day] = [];
          merged[day].push({ subject, duration });
        });

        const grouped = Object.entries(merged).map(([day, subjects]) => ({
          day,
          subjects
        }));

        setStudyPlan(grouped);
      } catch (err) {
        console.error("❌ Study Plan Error:", err);
      } finally {
        setLoadingPlan(false);
      }
    };

    fetchWeeklyPlan();
    loadSuggestion(); // also load suggestion on mount
  }, [userId]);

  const { start, end } = getWeekRange();
  const totalHours = Math.floor(totalMinutes / 60);
  const totalMins = totalMinutes % 60;

  // 🖨️ PDF Export Handler
  const handleExportPDF = () => {
    const element = pdfRef.current;
    const opt = {
      margin: 0.5,
      filename: `Study_Plan_${start}_to_${end}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="p-4 bg-white min-h-screen grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left: AI Suggestion */}
      <div className="bg-slate-200 p-6 rounded-xl shadow-xl">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-blue-900">🌟 AI Suggestion for Tomorrow</h2>
          <button
            className="text-sm bg-white text-blue-700 px-3 py-1 rounded hover:bg-blue-50"
            onClick={loadSuggestion}
          >
            🔁 Refresh
          </button>
        </div>
        {loadingSuggestion ? (
          <p className="text-gray-700">⏳ Generating...</p>
        ) : (
          <div className="whitespace-pre-wrap text-blue-900">{suggestion}</div>
        )}
      </div>

      {/* Right: Weekly Plan */}
      <div className="bg-slate-200 p-6 rounded-xl shadow-xl" ref={pdfRef}>
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-2xl font-bold text-blue-700">📅 Weekly Study Plan</h2>
            <p className="text-gray-600">🗓️ Week: {start} - {end}</p>
          </div>
          <button
            onClick={handleExportPDF}
            className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            🖨️ Export PDF
          </button>
        </div>

        {loadingPlan ? (
          <p className="text-center text-gray-500">⏳ Generating your study plan...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {studyPlan.map((entry, index) => {
                const gradientClass = getSubjectColor(entry.subjects[0]?.subject);
                return (
                  <div
                    key={index}
                    className={`text-white rounded-lg p-4 shadow bg-gradient-to-br ${gradientClass}`}
                  >
                    <h3 className="font-semibold text-lg mb-2">{entry.day}</h3>
                    {entry.subjects.map((s, i) => (
                      <p key={i} className="text-sm">
                        📘 {s.subject} - {s.duration} min
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>
            <div className="mt-6 text-sm text-gray-700 text-center">
              ⏱️ Total Study Time: <strong>{totalHours}h {totalMins}m</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudyPlanDashboard;
