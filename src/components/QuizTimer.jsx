// 📁 src/components/QuizTimer.jsx
import React, { useState, useEffect, useRef } from "react";

const alarmSound = new Audio("/alarm.mp3"); // 🔔 Place alarm.mp3 in public/

export default function QuizTimer({ durationInMinutes, onTimeout }) {
  const [secondsLeft, setSecondsLeft] = useState(durationInMinutes * 60);
  const [started, setStarted] = useState(false);
  const [alerted, setAlerted] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!started) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 301 && !alerted) {
          if (Notification.permission === "granted") {
            new Notification("⏳ 5 minutes left!");
          }
          setAlerted(true);
        }

        if (prev <= 1) {
          clearInterval(intervalRef.current);
          alarmSound.play();
          if (onTimeout) onTimeout();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [started]);

  const format = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="text-center">
      <p className="text-2xl font-mono text-blue-700">⏱ {format(secondsLeft)}</p>
      {!started && (
        <button
          onClick={() => {
            Notification.requestPermission();
            setStarted(true);
          }}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
        >
          ▶️ Start Timer
        </button>
      )}
    </div>
  );
}
