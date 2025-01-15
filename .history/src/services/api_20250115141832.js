import axios from "axios";

// Fungsi untuk mengambil token dari cookies
const getTokenFromCookie = () => {
  const cookies = document.cookie.split("; "); // Ambil semua cookie sebagai array
  const tokenCookie = cookies.find((row) => row.startsWith("token=")); // Cari cookie yang berisi "token="
  return tokenCookie ? tokenCookie.split("=")[1] : null; // Ambil nilai token jika ditemukan
};

export const fetchAPI = async ({ method, url, data }) => {
  try {
    const token = getTokenFromCookie(); // Ambil token dari cookie

    const response = await axios({
      method,
      url,
      data,
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: token ? `Bearer ${token}` : "", // Menambahkan token ke header
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};
