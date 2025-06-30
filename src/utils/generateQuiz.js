export const generateQuiz = async (subject) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Smart Study Scheduler"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-70b-instruct",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that generates JSON-only quiz questions."
          },
          {
            role: "user",
            content: `Generate 10 multiple-choice questions on "${subject}".
Return as an array of JSON objects with keys:
- question: string,
- options: array of 4 strings,
- answer: index (0-3)`
          }
        ]
      })
    });

    const data = await response.json();
    const rawText = data.choices?.[0]?.message?.content;

    const start = rawText.indexOf("[");
    const end = rawText.lastIndexOf("]");
    const jsonString = rawText.substring(start, end + 1);

    return JSON.parse(jsonString);
  } catch (err) {
    console.error("❌ Quiz API failed. Returning mock quiz.", err);
    return [
      {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: 2
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Venus", "Mars", "Jupiter"],
        answer: 2
      },
      {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: 1
      }
    ];
  }
};
