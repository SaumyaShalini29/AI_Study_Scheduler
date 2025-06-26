/*import React from "react";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Optional: nice colors
const colors = [
  "bg-purple-200 text-purple-800",
  "bg-blue-200 text-blue-800",
  "bg-green-200 text-green-800",
  "bg-orange-200 text-orange-800",
  "bg-yellow-200 text-yellow-800",
  "bg-red-200 text-red-800",
  "bg-pink-200 text-pink-800"
];

const StudyCalendar = ({ data }) => {
  // Group by day
  const dayMap = {
  Sunday: "Sun",
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat"
};

const grouped = {};
data.forEach((entry) => {
  const shortDay = dayMap[entry.day] || entry.day; // fallback if already short
  if (!grouped[shortDay]) grouped[shortDay] = [];
  grouped[shortDay].push(entry);
});


  return (
    <div className="w-full overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4 text-blue-700">📆 Weekly Calendar</h3>
      <div className="grid grid-cols-7 gap-4 text-center">
        {dayNames.map((day, idx) => (
          <div
            key={day}
            className="p-3 border border-gray-200 rounded-lg bg-gray-50 shadow-sm"
          >
            <h4 className="font-bold text-gray-700">{day}</h4>
            <div className="mt-2 space-y-2">
              {grouped[day] ? (
                grouped[day].map((task, i) => (
                  <div
                    key={i}
                    className={`text-sm px-2 py-1 rounded-md ${colors[i % colors.length]}`}
                  >
                    {task.subject} — {Math.floor(task.duration / 60)}h {task.duration % 60}m
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-xs">No sessions</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyCalendar;
*/
/*
import React from "react";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const colors = [
  "bg-purple-200 text-purple-800",
  "bg-blue-200 text-blue-800",
  "bg-green-200 text-green-800",
  "bg-orange-200 text-orange-800",
  "bg-yellow-200 text-yellow-800",
  "bg-red-200 text-red-800",
  "bg-pink-200 text-pink-800"
];

const StudyCalendar = ({ data }) => {
  // Convert full day name to short form
  const dayMap = {
    Sunday: "Sun",
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat"
  };

  // Group by short day name
  const grouped = {};
  data.forEach((entry) => {
    const shortDay = dayMap[entry.day] || entry.day; // fallback if already short
    if (!grouped[shortDay]) grouped[shortDay] = [];
    grouped[shortDay].push(entry);
  });
  let weekRange = "";
  if (data.length > 0) {
    const sortedDates = data
      .map(item => new Date(item.date)) // assume each `entry` has a `date` field (e.g., "2025-06-24")
      .sort((a, b) => a - b);

    const start = sortedDates[0];
    const end = sortedDates[sortedDates.length - 1];

    const format = (d) =>
      d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    weekRange = `${format(start)} - ${format(end)}`;
  }


  return (
    <div className="w-full overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4 text-purple-700">📆 Weekly Calendar</h3>
      {weekRange && (
          <p className="text-sm text-gray-600 font-medium">🗓️ {weekRange}</p>
        )}

      <div className="grid grid-cols-7 gap-4 text-center">
        {dayNames.map((day, idx) => (
          <div
            key={day}
            className="p-3 border border-gray-200 rounded-lg bg-gray-50 shadow-sm min-h-[150px]"
          >
            <h4 className="font-bold text-gray-700">{day}</h4>
            <div className="mt-2 space-y-2">
              {grouped[day] ? (
                grouped[day].map((task, i) => (
                  <div
                    key={i}
                    className={`text-sm px-2 py-1 rounded-md ${colors[i % colors.length]}`}
                  >
                    {task.subject} — {Math.floor(task.duration / 60)}h {task.duration % 60}m
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-xs">No sessions</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyCalendar;
*/
import React from "react";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const colors = [
  "bg-purple-200 text-purple-800",
  "bg-blue-200 text-blue-800",
  "bg-green-200 text-green-800",
  "bg-orange-200 text-orange-800",
  "bg-yellow-200 text-yellow-800",
  "bg-red-200 text-red-800",
  "bg-pink-200 text-pink-800"
];

const StudyCalendar = ({ data }) => {
  const dayMap = {
    Sunday: "Sun",
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat"
  };

  // Function to get date from a day string (e.g. "Monday")
  const getDateFromDay = (dayName) => {
    const today = new Date();
    const currentDayIndex = today.getDay(); // 0=Sun...6=Sat
    const targetDayIndex = Object.keys(dayMap).indexOf(dayName);
    const diff = (targetDayIndex - currentDayIndex + 7) % 7;
    const result = new Date();
    result.setDate(today.getDate() + diff);
    return result;
  };

  // Group by short day name
  const grouped = {};
  const allDates = [];

  data.forEach((entry) => {
    const shortDay = dayMap[entry.day] || entry.day;
    if (!grouped[shortDay]) grouped[shortDay] = [];

    const date = entry.date ? new Date(entry.date) : getDateFromDay(entry.day);
    allDates.push(date);

    grouped[shortDay].push({ ...entry, date });
  });

  // Calculate week range
  let weekRange = "";
  if (allDates.length > 0) {
    const sortedDates = allDates.sort((a, b) => a - b);
    const format = (d) =>
      d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    weekRange = `${format(sortedDates[0])} - ${format(sortedDates[sortedDates.length - 1])}`;
  }

  return (
    <div className="w-full overflow-x-auto">
      <h3 className="text-lg font-semibold mb-2 text-purple-700">📆 Weekly Calendar</h3>
      {weekRange && (
        <p className="text-sm text-gray-600 font-medium mb-4">🗓️ {weekRange}</p>
      )}

      <div className="grid grid-cols-7 gap-4 text-center">
        {dayNames.map((day, idx) => (
          <div
            key={day}
            className="p-3 border border-gray-200 rounded-lg bg-gray-50 shadow-sm min-h-[150px]"
          >
            <h4 className="font-bold text-gray-700">{day}</h4>
            <div className="mt-2 space-y-2">
              {grouped[day] ? (
                grouped[day].map((task, i) => (
                  <div
                    key={i}
                    className={`text-sm px-2 py-1 rounded-md ${colors[i % colors.length]}`}
                  >
                    {task.subject} — {Math.floor(task.duration / 60)}h {task.duration % 60}m
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-xs">No sessions</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyCalendar;
