import axios from "axios";

export const fetchAPI = async ({ method, url, data }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: `Bearer ${token}`, // pastikan token ada di sini
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
