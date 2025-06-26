/*import React, { useEffect, useState } from 'react';

const ScheduleSuggestion = ({ subject }) => {
  const [suggestedDuration, setSuggestedDuration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!subject) return;

    const fetchSuggestion = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/schedule/suggest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subject),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch suggestion');
        }

        const data = await response.json();
        if (data.suggestedDuration) {
          setSuggestedDuration(data.suggestedDuration);
        } else {
          setError('No suggestion available.');
        }
      } catch (err) {
        console.error('Error fetching suggestion:', err);
        setError('Failed to load suggestion. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestion();
  }, [subject]);

  if (loading) return <p className="text-yellow-500">Loading suggestion...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 bg-green-100 rounded mt-4">
      <h3 className="text-lg font-semibold mb-2">📊 Suggestion for: {subject.name}</h3>
      <p>💡 You should study for <strong>{suggestedDuration} minutes</strong> based on your input.</p>
    </div>
  );
};

export default ScheduleSuggestion;
*/
// MotivationScheduler.jsx
import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";

const motivationalQuotes = [
  "Success is built on discipline, not motivation.",
  "Small steps every day lead to big results.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Focus on progress, not perfection.",
  "Consistency beats talent every time."
];

const TodoItem = ({ task, index, toggleTask, startTimer, timerActive }) => {
  return (
    <div className="flex items-center justify-between bg-blue-900  dark:bg-gray-800 p-2 rounded-lg shadow">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(index)}
        />
        <span className={task.completed ? "line-through text-gray-500" : "text-black dark:text-white"}>{task.text}</span>
      </label>
      <button
        onClick={() => startTimer(index)}
        className="bg-blue-500 text-white px-2 py-1 rounded"
      >
        {timerActive[index] ? "Stop" : "Start"} ⏱
      </button>
    </div>
  );
};

export default function MotivationDashboard() {
  const [dark, setDark] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [goal, setGoal] = useState("");
  const [todos, setTodos] = useState([]);
  const [timerActive, setTimerActive] = useState({});

  const toggleTheme = () => setDark(!dark);
  const addGoal = () => {
    if (goal.trim()) {
      setTodos([...todos, { text: goal, completed: false }]);
      setGoal("");
    }
  };

  const toggleTask = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const startTimer = (index) => {
    setTimerActive((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const completionPercent = todos.length ? Math.round((completedCount / todos.length) * 100) : 0;

  return (
    <div className={`${dark ? "dark" : ""} min-h-screen p-6 bg-blue-200 dark:bg-gray-900`}>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-300">Get Motivated</h1>
          <button onClick={toggleTheme} className="p-2 text-gray-800 dark:text-white">
            {dark ? <Sun /> : <Moon />}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">💡 AI Motivation Quote</h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">"{motivationalQuotes[quoteIndex]}"</p>
          <button
            className="mt-3 text-sm text-blue-500 hover:underline"
            onClick={() => setQuoteIndex((quoteIndex + 1) % motivationalQuotes.length)}
          >
            Show Another Quote
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">🎯 Daily Goal</h2>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              className="flex-1 p-2 rounded border dark:bg-gray-700 dark:text-white"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Enter your goal"
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={addGoal}
            >Add</button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">📋 Mini To-do List</h2>
            <span className="text-sm text-gray-600 dark:text-gray-300">{completionPercent}% Completed</span>
          </div>
          <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${completionPercent}%` }}
            ></div>
          </div>
          <div className="space-y-2">
            {todos.map((task, idx) => (
              <TodoItem
                key={idx}
                task={task}
                index={idx}
                toggleTask={toggleTask}
                startTimer={startTimer}
                timerActive={timerActive}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
