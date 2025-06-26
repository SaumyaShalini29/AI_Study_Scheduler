/*export const generateTodaySuggestion = async (todayData) => {
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
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a motivational and intelligent AI study coach." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "❌ AI failed to generate suggestions.";
};
*/
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
      model: "meta-llama/llama-3-70b-instruct", // ✅ working model
      messages: [
        { role: "system", content: "You are a motivational and intelligent AI study coach." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  console.log("📦 OpenRouter Response:", data);

  return data.choices?.[0]?.message?.content || "❌ AI failed to generate suggestions.";
};
