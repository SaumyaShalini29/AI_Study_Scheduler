/*import React, { useEffect, useState } from 'react';
import { generateTodaySuggestion } from '../utils/generateTodaySuggestion';

const TodaySuggestion = () => {
  const [todayData, setTodayData] = useState([]);
  const [aiAdvice, setAiAdvice] = useState("Generating AI advice...");

  useEffect(() => {
    const fetchAndSuggest = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/subject/today-summary");
        const data = await res.json();
        setTodayData(data);
        const suggestion = await generateTodaySuggestion(data);
        setAiAdvice(suggestion);
      } catch (err) {
        console.error("❌ Error generating suggestion:", err);
        setAiAdvice("❌ Failed to fetch today's data or generate suggestion.");
      }
    };

    fetchAndSuggest();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg whitespace-pre-wrap font-mono">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">📅 AI Suggestion for Tomorrow</h2>
      {aiAdvice}
    </div>
  );
};

export default TodaySuggestion;
*/

/*
import React, { useEffect, useState } from 'react';
import { generateTodaySuggestion } from '../utils/generateTodaySuggestion';

const TodaySuggestion = () => {
  const [aiAdvice, setAiAdvice] = useState("Generating AI advice...");

  useEffect(() => {
    const fetchAndSuggest = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/subject/today-summary");
        const data = await res.json();
        const suggestion = await generateTodaySuggestion(data);
        setAiAdvice(suggestion);
      } catch (err) {
        console.error("❌ Error generating suggestion:", err);
        setAiAdvice("❌ Failed to fetch today's data or generate suggestion.");
      }
    };

    fetchAndSuggest();
  }, []);

  return (

      <div className="border border-white rounded p-4 shadow-sm">
        <h3 className="font-bold text-lg mb-2">📘 Today’s Study Summary</h3>
        <p>{aiAdvice}</p>
      </div>
  );
};

export default TodaySuggestion;
*/

/*
import React, { useEffect, useState } from 'react';
import { generateTodaySuggestion } from '../utils/generateTodaySuggestion';

const TodaySuggestion = () => {
  const [aiAdvice, setAiAdvice] = useState("Generating AI advice...");

  useEffect(() => {
    const fetchAndSuggest = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/subject/today-summary");
        const data = await res.json();
        const suggestion = await generateTodaySuggestion(data);
        setAiAdvice(suggestion);
      } catch (err) {
        console.error("❌ Error generating suggestion:", err);
        setAiAdvice("❌ Failed to fetch today's data or generate suggestion.");
      }
    };

    fetchAndSuggest();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-200 to-blue-50 p-6 rounded-xl shadow-lg text-blue-800">
      <h2 className="text-xl font-bold mb-4">📅 AI Study Suggestion for Tomorrow</h2>
      
      <div className="bg-white bg-opacity-10 border border-white rounded-lg p-4">
        <h3 className="font-semibold text-purple-700 mb-2">🔮 Plan for Tomorrow</h3>
        <ul className="list-disc list-inside space-y-1">
          {aiAdvice.split('\n').map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodaySuggestion;
*/
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { generateTodaySuggestion } from '../utils/generateTodaySuggestion';

const TodaySuggestion = () => {
  const [aiAdvice, setAiAdvice] = useState("Generating AI advice...");
  const { user } = useUser();

  useEffect(() => {
    if (!user) return; // wait until Clerk loads user

    const fetchAndSuggest = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/subject/today-summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId: user.id }) // ✅ send current userId
        });

        const data = await res.json();
        const suggestion = await generateTodaySuggestion(data);
        setAiAdvice(suggestion);
      } catch (err) {
        console.error("❌ Error generating suggestion:", err);
        setAiAdvice("❌ Failed to fetch today's data or generate suggestion.");
      }
    };

    fetchAndSuggest();
  }, [user]);

  return (
    <div className="bg-gradient-to-br from-blue-200 to-blue-50 p-6 rounded-xl shadow-lg text-blue-800">
      <h2 className="text-xl font-bold mb-4">📅 AI Study Suggestion for Tomorrow</h2>
      
      <div className="bg-white bg-opacity-10 border border-white rounded-lg p-4">
        <h3 className="font-semibold text-purple-700 mb-2">🔮 Plan for Tomorrow</h3>
        <ul className="list-disc list-inside space-y-1">
          {aiAdvice.split('\n').map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodaySuggestion;
