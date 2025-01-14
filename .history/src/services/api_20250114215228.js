import axios from "axios";

export const fetchAPI = async ({ method, url, data }) => {
  try {
    const response = await axios({
      method, // POST, GET, PUT, DELETE
      url, // endpoint API
      data, // body request (jika ada)
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });
    return response;
  } catch (error) {
    throw error; // Bisa ditangani lebih lanjut di tempat lain
  }
};
