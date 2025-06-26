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
   <div className="grid grid-cols-[40%_60%] gap-4" style={{ height: '600px' }}>
  {/* Left - Today Suggestion */}
  <div className="bg-gradient-to-br from-blue-200 to-blue-50 text-white p-4 rounded-xl shadow-xl h-full overflow-y-auto">
    <h2 className="text-xl font-bold mb-4">🌟 AI Suggestion for Tomorrow</h2>
    <div className="h-full">
      <TodaySuggestion />
    </div>
  </div>

  {/* Right - Weekly Study Plan */}
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
