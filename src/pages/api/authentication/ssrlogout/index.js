import axios from "axios";

export default async function handler(req, res) {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/logout`
    );
    res.json({ message: "Logout successful", data: data?.data });
  } catch (error) {
    res.json({
      message: "Logout failed",
      error: error.response?.data || error.message,
    });
  }
}
