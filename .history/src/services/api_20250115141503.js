import axios from "axios";

export const fetchAPI = async ({ method, url, data, token }) => {
  try {
    const response = await axios({
      const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1] || localStorage.getItem("token");

      method,
      url,
      data,
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
