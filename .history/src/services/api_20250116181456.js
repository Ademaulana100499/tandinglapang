import axios from "axios";

export const fetchAPI = async ({ method, url, data, req }) => {
  try {
    // Ambil token dari cookies
    const token = req?.headers.authorization?.split(" ")[1];

    if (!token) throw new Error("Unauthorized: No token provided");

    const response = await axios({
      method,
      url,
      data,
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Mengembalikan data langsung
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
