import axios from "axios";

export const fetchAPI = async () => {
  try {
    const response = await axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
