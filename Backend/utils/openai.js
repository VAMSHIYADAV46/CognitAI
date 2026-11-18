import dotenv from "dotenv";
import { resolveModel } from "./models.js";

dotenv.config();

const getOpenAIAPIResponse = async (message, model) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: resolveModel(model),
      messages: [{ role: "user", content: `${message}` }],
    }),
  };

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    options
  );
  const data = await response.json();

  // Groq returns { error: { message } } when a model is unavailable or rate limited
  if (!response.ok || !data.choices?.[0]?.message?.content) {
    throw new Error(data.error?.message || "Model did not return a reply");
  }

  // Some reasoning models (e.g. Qwen) can include <think>...</think> in the text
  return data.choices[0].message.content
    .replace(/<think>[\s\S]*?<\/think>/g, "")
    .trim();
};

export default getOpenAIAPIResponse;