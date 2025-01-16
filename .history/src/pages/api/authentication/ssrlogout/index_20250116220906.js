import axios from "axios";

export default async function handler(req, res) {
  const token = req.cookies.token || "";
  try {
    console.log(token);
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.json({ message: "Logout successful", data: data?.data });
  } catch (error) {
    res.json({
      message: "Logout failed",
      error: error.response?.data || error.message,
    });
  }
}
