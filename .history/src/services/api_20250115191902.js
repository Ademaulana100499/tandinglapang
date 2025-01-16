// pages/api/fetchAPI.js
import { getCookie } from "cookies-next";
import axios from "axios";

export default async function handler(req, res) {
  const token = getCookie("token", { req, res }); // Ambil token dari cookies di server-side
  if (!token) {
    return res.status(401).json({ error: "Token tidak ditemukan." });
  }

  try {
    const response = await axios({
      method: req.method,
      url: req.body.url,
      data: req.body.data,
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: `Bearer ${token}`, // Kirimkan token di header Authorization
      },
    });
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
