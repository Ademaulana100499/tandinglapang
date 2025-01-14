import axios from "axios";

export const fetchAPI = async (options) => {
  try {
    const response = await axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
        apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
      },
      ...options,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
