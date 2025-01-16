import axios from "axios";
import { getCookie } from "cookies-next";

export const fetchAPI = async ({ method, url, data }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
