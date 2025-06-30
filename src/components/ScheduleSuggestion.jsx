
// MotivationScheduler.jsx
/*
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
  */

/*
 import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const motivationalQuotes = [
  "Success is built on discipline, not motivation.",
  "Small steps every day lead to big results.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Focus on progress, not perfection.",
  "Consistency beats talent every time."
];

const TodoItem = ({ task, index, toggleTask, startTimer, timerActive, deleteTask }) => {
  return (
    <div className="flex items-center justify-between bg-blue-900 dark:bg-gray-800 p-2 rounded-lg shadow">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(index)}
        />
        <span className={task.completed ? "line-through text-gray-500" : "text-black dark:text-white"}>
          {task.text}
        </span>
      </label>
      <div className="flex gap-2">
        <button
          onClick={() => startTimer(index)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          {timerActive[index] ? "Stop" : "Start"} ⏱
        </button>
        <button
          onClick={() => deleteTask(index)}
          className="text-red-300 hover:text-red-500 text-lg font-bold"
        >
          ❌
        </button>
      </div>
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

  // 🔁 Load from localStorage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const savedGoal = localStorage.getItem("goal") || "";
    setTodos(savedTodos);
    setGoal(savedGoal);
  }, []);

  // 💾 Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 💾 Save goal to localStorage
  useEffect(() => {
    localStorage.setItem("goal", goal);
  }, [goal]);

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

  const deleteTask = (index) => {
    const updated = [...todos];
    updated.splice(index, 1);
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
            >
              Add
            </button>
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
                deleteTask={deleteTask}
              />
            ))}
          </div>

          {todos.length > 0 && (
            <button
              onClick={() => setTodos([])}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              🧹 Clear All Tasks
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

*/

/*
import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const motivationalQuotes = [
  "Success is built on discipline, not motivation.",
  "Small steps every day lead to big results.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Focus on progress, not perfection.",
  "Consistency beats talent every time."
];

const TodoItem = ({ task, index, toggleTask, startTimer, timerActive, deleteTask }) => (
  <div className="flex items-center justify-between bg-blue-900 dark:bg-gray-800 p-2 rounded-lg shadow">
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(index)}
      />
      <span className={task.completed ? "line-through text-gray-500" : "text-black dark:text-white"}>
        {task.text}
      </span>
    </label>
    <div className="flex gap-2">
      <button
        onClick={() => startTimer(index)}
        className="bg-blue-500 text-white px-2 py-1 rounded"
      >
        {timerActive[index] ? "Stop" : "Start"} ⏱
      </button>
      <button
        onClick={() => deleteTask(index)}
        className="text-red-300 hover:text-red-500 text-lg font-bold"
      >
        ❌
      </button>
    </div>
  </div>
);

export default function MotivationDashboard() {
  const { user } = useUser();
  const userId = user?.id;

  const [dark, setDark] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [goal, setGoal] = useState("");
  const [todos, setTodos] = useState([]);
  const [timerActive, setTimerActive] = useState({});

  const toggleTheme = () => setDark(!dark);

  // 🔁 Load data from backend
  useEffect(() => {
    if (!userId) return;

    const loadData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/motivation/load/${userId}`);
        const data = await res.json();
        if (data?.todos) setTodos(data.todos);
        if (data?.goal) setGoal(data.goal);
      } catch (err) {
        console.error("❌ Error loading data:", err);
      }
    };

    loadData();
  }, [userId]);

  // 💾 Save data to backend
  useEffect(() => {
    if (!userId) return;

    const saveData = async () => {
      try {
        await fetch("http://localhost:5000/api/motivation/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, todos, goal })
        });
      } catch (err) {
        console.error("❌ Error saving data:", err);
      }
    };

    saveData();
  }, [todos, goal, userId]);

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

  const deleteTask = (index) => {
    const updated = [...todos];
    updated.splice(index, 1);
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
            >
              Add
            </button>
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
                deleteTask={deleteTask}
              />
            ))}
          </div>

          {todos.length > 0 && (
            <button
              onClick={() => setTodos([])}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              🧹 Clear All Tasks
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
*/
import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import PomodoroTimer from '../components/PomodoroTimer'
const motivationalQuotes = [
  "Success is built on discipline, not motivation.",
  "Small steps every day lead to big results.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Focus on progress, not perfection.",
  "Consistency beats talent every time."
];

const TodoItem = ({ task, toggleTask, startTimer, timerActive, deleteTask }) => (
  <div className="flex items-center justify-between bg-blue-900 dark:bg-gray-800 p-2 rounded-lg shadow">
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task._id)}
      />
      <span className={task.completed ? "line-through text-gray-500" : "text-black dark:text-white"}>
        {task.text}
      </span>
    </label>
    <div className="flex gap-2">
      <button
        onClick={() => startTimer(task._id)}
        className="bg-blue-500 text-white px-2 py-1 rounded"
      >
        {timerActive[task._id] ? "Stop" : "Start"} ⏱
      </button>
      <button
        onClick={() => deleteTask(task._id)}
        className="text-red-300 hover:text-red-500 text-lg font-bold"
      >
        ❌
      </button>
    </div>
  </div>
);

export default function MotivationDashboard() {
  const { user } = useUser();
  const userId = user?.id;

  const [dark, setDark] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [goal, setGoal] = useState("");
  const [todos, setTodos] = useState([]);
  const [timerActive, setTimerActive] = useState({});

  const toggleTheme = () => setDark(!dark);

  // 🔁 Load Todos on mount
  useEffect(() => {
    if (!userId) return;

    const fetchTodos = async () => {
      const res = await fetch("http://localhost:5000/api/todo/get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      setTodos(data);
    };

    fetchTodos();
  }, [userId]);

  // ➕ Add Todo
  const addGoal = async () => {
    if (goal.trim()) {
      const res = await fetch("http://localhost:5000/api/todo/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, text: goal }),
      });
      const newTodo = await res.json();
      setTodos((prev) => [...prev, newTodo]);
      setGoal("");
    }
  };

  // ✅ Toggle Task
  const toggleTask = async (id) => {
    const res = await fetch("http://localhost:5000/api/todo/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const updated = await res.json();
    setTodos((prev) =>
      prev.map((todo) => (todo._id === updated._id ? updated : todo))
    );
  };

  // ❌ Delete Task
  const deleteTask = async (id) => {
    await fetch("http://localhost:5000/api/todo/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  const startTimer = (id) => {
    setTimerActive((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const completionPercent = todos.length
    ? Math.round((completedCount / todos.length) * 100)
    : 0;

  return (
    <div className={`${dark ? "dark" : ""} min-h-screen p-6 bg-slate-200 dark:bg-gray-900`}>
      <div className="max-w-2xl mx-auto space-y-6 ">
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
            >
              Add
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">📋 Mini To-do List</h2>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {completionPercent}% Completed
            </span>
          </div>
          <div className="w-50 h-2 bg-gray-300 dark:bg-gray-700 rounded-full">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${completionPercent}%` }}
            ></div>
          </div>

          <div className="space-y-2">
            {todos.map((task) => (
              <TodoItem
                key={task._id}
                task={task}
                toggleTask={toggleTask}
                startTimer={startTimer}
                timerActive={timerActive}
                deleteTask={deleteTask}
              />
            ))}
          </div>
        </div>
      </div>
     <div className="flex justify-center mt-6">
  <div className="w-full max-w-2xl px-4">
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <PomodoroTimer />
    </div>
  </div>
</div>


    </div>
  );
}
