// pages/api/fetchAPI.js
import axios from "axios";
import { getCookie } from "cookies-next";

export const fetchAPI = async ({ method, url, data, req, res }) => {
  const token = getCookie("token", { req, res }); // Menambahkan { req, res }
  console.log(token); // Cek apakah token diambil dengan benar
  try {
    const response = await axios({
      method,
      url,
      data,
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: `Bearer ${token}`, // Gunakan token dari cookies
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
