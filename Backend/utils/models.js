// // Keep the ids in sync with Backend/utils/models.js
// export const MODELS = [
//   { id: "openai/gpt-oss-120b", label: "GPT-OSS 120B", note: "Flagship, best quality" },
//   { id: "openai/gpt-oss-20b", label: "GPT-OSS 20B", note: "Fast and light" },
//   { id: "qwen/qwen3.8-27b", label: "Qwen 3.8 27B", note: "Alibaba Cloud" },
//   { id: "llama-3.3-70b-versatile", label: "Llama 3.3 70B", note: "Meta, versatile" },
//   { id: "llama-3.1-8b-instant", label: "Llama 3.1 8B", note: "Meta, fastest" },
// ];

// export const DEFAULT_MODEL = MODELS[0].id;

// Single source of truth for the models users can pick (Groq model IDs).
// Anything not in this list is rejected, so nobody can send an arbitrary model ID.
export const MODELS = [
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.8-27b",
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
];

export const DEFAULT_MODEL = "openai/gpt-oss-120b";

export const resolveModel = (model) =>
  MODELS.includes(model) ? model : DEFAULT_MODEL;