// OpenAI API call (for frontend testing only)
async function main(prompt) {
  const apiKey =
    "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";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // or "gpt-4o"
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 400,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || "API Error");
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || "No response";
}

export default main;
