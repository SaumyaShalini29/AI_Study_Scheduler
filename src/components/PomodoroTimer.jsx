import React, { useEffect, useState, useRef } from "react";

const alarmSound = new Audio("/alarm.mp3"); // Place in public folder

export default function CustomPomodoro() {
  const [focusDuration, setFocusDuration] = useState(50);
  const [breakDuration, setBreakDuration] = useState(10);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [fiveMinAlertSent, setFiveMinAlertSent] = useState(false);
  const intervalRef = useRef(null);

  // Ask for notification permission
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60).toString().padStart(2, "0");
    const secs = (s % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const startPomodoro = () => {
    const duration = (isBreak ? breakDuration : focusDuration) * 60;
    setTimeLeft(duration);
    setIsRunning(true);
    setFiveMinAlertSent(false);
  };

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;

        if (next === 300 && !fiveMinAlertSent) {
          if (Notification.permission === "granted") {
            new Notification("⏳ 5 Minutes Left!", {
              body: isBreak ? "Break ending soon!" : "Focus ending soon!",
            });
          }
          setFiveMinAlertSent(true);
        }

        if (next <= 0) {
          clearInterval(intervalRef.current);
          alarmSound.play();

          if (Notification.permission === "granted") {
            new Notification(isBreak ? "🎯 Time to Focus!" : "🧘 Take a Break!", {
              body: isBreak ? "Next focus round starts now." : "Enjoy a short break!",
            });
          }

          setIsBreak(!isBreak);
          setIsRunning(false);
          return 0;
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  return (
    <div className="bg-white w-18 h-auto dark:bg-gray-800 p-6 rounded-xl shadow text-center space-y-4 mt-4">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white">🍅 Custom Pomodoro Timer</h2>

      <div className="flex justify-center gap-4 w-30 h-16 text-gray-700 dark:text-gray-300">
        <div className="">
          <label>Focus (min)</label>
          <input
            type="number"
            className="w-16 text-center border rounded p-1 dark:bg-gray-700 dark:text-white"
            value={focusDuration}
            onChange={(e) => setFocusDuration(+e.target.value)}
            disabled={isRunning}
          />
        </div>
        <div className="">
          <label>Break (min)</label>
          <input
            type="number"
            className="w-16 text-center border rounded p-1 dark:bg-gray-700 dark:text-white"
            value={breakDuration}
            onChange={(e) => setBreakDuration(+e.target.value)}
            disabled={isRunning}
          />
        </div>
      </div>

      <p className="text-4xl font-mono text-blue-700 dark:text-blue-300">{formatTime(timeLeft)}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">{isBreak ? "🧘 Break Time" : "🎯 Focus Time"}</p>

      <button
        onClick={startPomodoro}
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-400"
        disabled={isRunning}
      >
        ▶️ Start
      </button>
    </div>
  );
}
