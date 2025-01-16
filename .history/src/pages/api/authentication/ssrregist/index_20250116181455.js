import axios from "axios";

export default async function handler(req, res) {
  try {
    const { email, password } = req.body;
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    res.json({ message: "Login successful", data: data?.data });
  } catch (error) {
    res.json({
      message: "Login failed",
      error: error.response?.data || error.message,
    });
  }
}
