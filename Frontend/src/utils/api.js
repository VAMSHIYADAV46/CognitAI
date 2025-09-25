// src/utils/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "API Error");
    }

    return await response.json();
  } catch (err) {
    console.error("API Fetch Error:", err.message);
    throw err;
  }
};
