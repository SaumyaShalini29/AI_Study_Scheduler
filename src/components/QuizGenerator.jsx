/*import React, { useState, useEffect, useRef } from "react";
import { generateQuiz } from "../utils/generateQuiz";

const alarm = new Audio("/alarm.mp3"); // 📁 Place in public folder

const QuizGenerator = () => {
  const [subject, setSubject] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState(180); // default 3 minutes
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  // Timer countdown logic
  useEffect(() => {
    if (running && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(intervalRef.current);
      alarm.play();
      setSubmitted(true);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, timer]);

  const startQuiz = async () => {
    if (!subject.trim()) return;
    try {
      const q = await generateQuiz(subject);
      setQuiz(q);
      setAnswers(new Array(q.length).fill(null));
      setSubmitted(false);
      setTimer(180);
      setRunning(true);
    } catch (err) {
      alert("Failed to generate quiz.");
    }
  };

  const handleOptionSelect = (qIdx, optionIdx) => {
    const updated = [...answers];
    updated[qIdx] = optionIdx;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    clearInterval(intervalRef.current);
    setRunning(false);
    alarm.play();
  };

  const score = quiz.reduce((acc, q, i) => acc + (q.answer === answers[i] ? 1 : 0), 0);
  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow space-y-4">
      <h1 className="text-xl font-bold text-center dark:text-white">🧠 AI Quiz Generator</h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter subject (e.g. Photosynthesis)"
          className="flex-1 border p-2 rounded dark:bg-gray-700 dark:text-white"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <button
          onClick={startQuiz}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Start Quiz
        </button>
      </div>

      {quiz.length > 0 && (
        <div>
          <div className="text-right text-sm text-gray-600 dark:text-gray-300">
            ⏱ Time Left: {formatTime(timer)}
          </div>

          {quiz.map((q, idx) => (
            <div key={idx} className="mt-4">
              <p className="font-medium text-gray-800 dark:text-white">{idx + 1}. {q.question}</p>
              <ul className="space-y-1 mt-2">
                {q.options.map((opt, optIdx) => (
                  <li key={optIdx}>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`q-${idx}`}
                        disabled={submitted}
                        checked={answers[idx] === optIdx}
                        onChange={() => handleOptionSelect(idx, optIdx)}
                      />
                      <span className="text-gray-700 dark:text-gray-300">{opt}</span>
                    </label>
                  </li>
                ))}
              </ul>
              {submitted && (
                <p className={
                  answers[idx] === q.answer ? "text-green-500" : "text-red-500"
                }>
                  {answers[idx] === q.answer ? "✅ Correct" : `❌ Correct: ${q.options[q.answer]}`}
                </p>
              )}
            </div>
          ))}

          {!submitted && (
            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Submit Quiz
            </button>
          )}

          {submitted && (
            <div className="mt-4 text-lg text-center text-blue-700 dark:text-blue-300">
              🎉 Your Score: {score} / {quiz.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;
*/




import React, { useState, useEffect, useRef } from "react";
import { generateQuiz } from "../utils/generateQuiz";

const alarm = new Audio("/alarm.mp3"); // 🔔 Time's up sound
const warning = new Audio("/warning.mp3"); // ⏰ 30 seconds left sound

const QuizGenerator = () => {
  const [subject, setSubject] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState(180); // 3 minutes
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const warned30 = useRef(false);

  useEffect(() => {
    if (running && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((t) => {
          if (t === 31 && !warned30.current) {
            warning.play();
            warned30.current = true;
            alert("⏰ Only 30 seconds left!");
          }
          return t - 1;
        });
      }, 1000);
    } else if (timer === 0) {
      clearInterval(intervalRef.current);
      alarm.play();
      alert("⏳ Time's up! Submitting your quiz.");
      setSubmitted(true);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, timer]);

  const startQuiz = async () => {
    if (!subject.trim()) return;
    try {
      const q = await generateQuiz(subject);
      setQuiz(q);
      setAnswers(new Array(q.length).fill(null));
      setSubmitted(false);
      setTimer(180);
      setRunning(true);
      warned30.current = false;
    } catch (err) {
      alert("Failed to generate quiz.");
    }
  };

  const handleOptionSelect = (qIdx, optionIdx) => {
    const updated = [...answers];
    updated[qIdx] = optionIdx;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    clearInterval(intervalRef.current);
    setRunning(false);
    alarm.play();
  };

  const score = quiz.reduce((acc, q, i) => acc + (q.answer === answers[i] ? 1 : 0), 0);
  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-slate-200 dark:bg-gray-800 rounded-lg shadow space-y-4">
      <h1 className="text-xl font-bold text-center dark:text-white">🧠 AI Quiz Generator</h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter subject (e.g. Photosynthesis)"
          className="flex-1 border p-2 rounded dark:bg-gray-700 dark:text-white"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <button
          onClick={startQuiz}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Start Quiz
        </button>
      </div>

      {quiz.length > 0 && (
        <div>
          <div className="text-right text-sm text-gray-600 dark:text-gray-300">
            ⏱ Time Left: {formatTime(timer)}
          </div>

          {quiz.map((q, idx) => (
            <div key={idx} className="mt-4">
              <p className="font-medium text-gray-800 dark:text-white">{idx + 1}. {q.question}</p>
              <ul className="space-y-1 mt-2">
                {q.options.map((opt, optIdx) => (
                  <li key={optIdx}>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`q-${idx}`}
                        disabled={submitted}
                        checked={answers[idx] === optIdx}
                        onChange={() => handleOptionSelect(idx, optIdx)}
                      />
                      <span className="text-gray-700 dark:text-gray-300">{opt}</span>
                    </label>
                  </li>
                ))}
              </ul>
              {submitted && (
                <p className={
                  answers[idx] === q.answer ? "text-green-500" : "text-red-500"
                }>
                  {answers[idx] === q.answer ? "✅ Correct" : `❌ Correct: ${q.options[q.answer]}`}
                </p>
              )}
            </div>
          ))}

          {!submitted && (
            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Submit Quiz
            </button>
          )}

          {submitted && (
            <div className="mt-4 text-lg text-center text-blue-700 dark:text-blue-300">
              🎉 Your Score: {score} / {quiz.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;
