/*
import React, { useEffect, useState } from "react";

const StreakTracker = () => {
  const [streak, setStreak] = useState(0);
  const [badge, setBadge] = useState("");

  useEffect(() => {
    // 👇 No user check, dummy userId or server handles fallback
    fetch("http://localhost:5000/api/streak/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "testUser123" }) // 🧪 Hardcoded ID for now
    })
      .then((res) => res.json())
      .then((data) => {
        setStreak(data.streak || 0);
        if (data.streak >= 7) setBadge("🏅 7-Day Legend!");
        else if (data.streak >= 3) setBadge("🔥 3-Day Streak!");
      })
      .catch((err) => console.error("Streak fetch error:", err));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 text-center p-4 rounded-xl shadow-md my-4">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
        📆 Study Streak: {streak} days
      </h3>
      {badge && (
        <p className="text-xl text-yellow-500 font-semibold">{badge}</p>
      )}
    </div>
  );
};

export default StreakTracker;
*/


import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

const StreakTracker = () => {
  const { user } = useUser();
  const [streak, setStreak] = useState(0);
  const [badge, setBadge] = useState("");

  useEffect(() => {
    if (!user?.id) return;

    fetch("http://localhost:5000/api/streak/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id })
    })
      .then((res) => res.json())
      .then((data) => {
        setStreak(data.streak || 0);
        if (data.streak >= 7) setBadge("🏅 30-Day Legend!");
        else if (data.streak >= 3) setBadge("🔥 7-Day Streak!");
      })
      .catch((err) => console.error("Streak fetch error:", err));
  }, [user]);

  return (
    <div className="bg-white dark:bg-gray-800 text-center p-4 rounded-xl shadow-md my-4 ">
      <h3 className="text-lg font-bold text-blue-600 dark:text-white mb-2">
        📆 Study Streak: {streak} days
      </h3>
      {badge && (
        <p className="text-xl text-yellow-500 font-semibold">{badge}</p>
      )}
    </div>
  );
};

export default StreakTracker;
