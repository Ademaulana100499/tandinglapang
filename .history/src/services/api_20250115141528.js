import axios from "axios";

export const fetchAPI = async ({ method, url, data }) => {
  try {
    // Ambil token dari cookie atau localStorage
    const token =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1] || localStorage.getItem("token");

    // Cek jika token ada dan kirim dengan header Authorization
    const response = await axios({
      method,
      url,
      data,
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: token ? `Bearer ${token}` : "", // Menambahkan token ke headers
      },
    });

    return response;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response);
    }
    throw error;
  }
};
