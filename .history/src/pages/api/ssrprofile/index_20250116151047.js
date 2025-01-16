import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    console.log({ tokenInServerSide: token });
    const { data } = await axios.get(`${process.env.API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.json({ message: "OK", data });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: "Unauthorized",
      error: error.response?.data || error.message,
    });
  }
}
