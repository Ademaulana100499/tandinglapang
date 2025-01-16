import axios from "axios";
import { cookies } from "next/headers";

export const fetchAPI = async ({ method, url, data }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
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
