import axios from "axios";
import { getCookie } from "cookies-next";

export const fetchAPI = async ({ method, url, data, headers }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
