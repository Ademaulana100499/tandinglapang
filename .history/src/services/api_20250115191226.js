import axios from "axios";
import Cookies from "js-cookie";

export const fetchAPI = async ({ method, url, data }) => {
  const token = Cookies.get("token");
  console.log(token);
  try {
    const response = await axios({
      method,
      url,
      data,
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
