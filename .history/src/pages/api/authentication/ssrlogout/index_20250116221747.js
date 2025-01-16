import axios from "axios";
import { deleteCookie } from "cookies-next";

export default async function handler(req, res) {
  const token = req.cookies.token || "";

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  try {
    console.log("Token:", token); // Debugging: cek token sebelum request

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/logout`,
      {}, // Body kosong
      { headers: { Authorization: `Bearer ${token}` } }
    );

    deleteCookie("token", { req, res }); // Hapus cookie dari sisi server

    res.status(200).json({ message: "Logout successful", data: response.data });
  } catch (error) {
    console.error("Logout API Error:", error.response?.data || error.message);

    res.status(500).json({
      message: "Logout failed",
      error: error.response?.data || "Internal Server Error",
    });
  }
}
