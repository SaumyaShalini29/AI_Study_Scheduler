/*export const generateStudyPlan = async (weeklyData) => {
  const prompt = `
You're an AI study assistant.

Below is a user's weekly study data in minutes per subject per day:

${JSON.stringify(weeklyData, null, 2)}

Please generate a smart 7-day study plan:
- Prioritize subjects that are weak (least time spent)
- Distribute time smartly (4–5 hours/day)
- Insert 10-min breaks after every 2 subjects
- Format clearly as:
Day 1:
 - Subject: Minutes
 - ...
- End with a motivational quote.
  `;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:5173",
      "X-Title": "Smart Study Scheduler"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful and motivational study planner." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "❌ AI failed to generate a plan.";
};
*/

/*
export const generateStudyPlan = async (weeklyData) => {
  const prompt = `
You're an AI study planner.

Here's the user's weekly study data in minutes per subject per day:

${JSON.stringify(weeklyData, null, 2)}

Now generate a smart 7-day study plan strictly in this JSON format (no explanation):

[
  { "day": "Monday", "subject": "Data Structure", "duration": 90 },
  { "day": "Monday", "subject": "Web", "duration": 60 },
  { "day": "Tuesday", "subject": "Aptitude", "duration": 120 },
  ...
]

Rules:
- Prioritize weaker subjects (less time spent)
- 4 to 5 hours per day max
- Distribute subjects smartly
- Skip explanation, return valid JSON only!
`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:5173",
      "X-Title": "Smart Study Scheduler"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful and structured JSON-only study planner." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  const message = data.choices?.[0]?.message?.content;

  try {
    const json = JSON.parse(message);
    return json; // ✅ This will now be proper JSON
  } catch (err) {
    console.error("❗ AI plan not in JSON format", message);
    return []; // empty fallback
  }
};
*/
/*
export const generateStudyPlan = async (weeklyData) => {
  const plan = await generateTodaySuggestion(weeklyData); // ✅ Correct

  const prompt = `
You're an AI study planner.

Here's the user's weekly study data in minutes per subject per day:

${JSON.stringify(weeklyData, null, 2)}

Now generate a smart 7-day study plan strictly in this JSON format (no explanation):

[
  { "day": "Monday", "subject": "Data Structure", "duration": 90 },
  { "day": "Monday", "subject": "Web", "duration": 60 },
  { "day": "Tuesday", "subject": "Aptitude", "duration": 120 },
  ...
]

Rules:
- Prioritize weaker subjects (less time spent)
- 4 to 5 hours per day max
- Distribute subjects smartly
- Skip explanation, return valid JSON only!
`;

  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:5173", // or your domain
      "X-Title": "Smart Study Scheduler"
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3-70b-instruct",
      messages: [
        {
          role: "system",
          content: "You are a helpful and structured JSON-only study planner."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  const data = await response.json();
  console.log("📦 OpenRouter Response:", data);

  const message = data.choices?.[0]?.message?.content;

  try {
    const json = JSON.parse(message);
    return json;
  } catch (err) {
    console.error("❗ OpenRouter plan not in JSON format", message);
    return [];
  }
};
*/
// 📁 src/utils/generateAIPlans.js

export const generateTodaySuggestion = async (todayData) => {
  const prompt = `
You're an AI study assistant.

Below is the user's subject-wise study time for today (in minutes):

${JSON.stringify(todayData, null, 2)}

Please do the following:
1. Identify weak subjects (least time spent).
2. Suggest study focus for tomorrow (3–4 subjects max, 4–5 hours total).
3. Recommend 1–2 practice tasks per subject.
4. Give a short motivation + 1 productivity tip.
`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:5173",
      "X-Title": "Smart Study Scheduler"
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3-70b-instruct",
      messages: [
        { role: "system", content: "You are a motivational and intelligent AI study coach." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  console.log("📦 OpenRouter Response (Today):", data);

  return data.choices?.[0]?.message?.content || "❌ AI failed to generate suggestions.";
};

export const generateStudyPlan = async (weeklyData) => {
  const prompt = `
You're an AI study planner.

Here's the user's weekly study data in minutes per subject per day:

${JSON.stringify(weeklyData, null, 2)}

Now generate a smart 7-day study plan strictly in this JSON format (no explanation):

[
  { "day": "Monday", "subject": "Data Structure", "duration": 90 },
  { "day": "Monday", "subject": "Web", "duration": 60 },
  ...
]

Rules:
- Prioritize weaker subjects (less time spent)
- 4 to 5 hours per day max
- Distribute subjects smartly
- Skip explanation, return valid JSON only!
`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:5173",
      "X-Title": "Smart Study Scheduler"
    },
    body: JSON.stringify({
      //model: "meta-llama/llama-3-70b-instruct",
      model: "mistralai/mistral-7b-instruct", // ✅ use a working free model
        max_tokens: 600,

      messages: [
        { role: "system", content: "You are a helpful and structured JSON-only study planner." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  console.log("📦 OpenRouter Response (Weekly):", data);

  const message = data.choices?.[0]?.message?.content;

  try {
    return JSON.parse(message);
  } catch (err) {
    console.error("❗ AI did not return valid JSON:", message);
    return [];
  }
};

