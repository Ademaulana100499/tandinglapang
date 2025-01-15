import axios from "axios";

export const fetchAPI = async ({ method, url }) => {
  try {
    const response = await axios({
      method,
      url,
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
