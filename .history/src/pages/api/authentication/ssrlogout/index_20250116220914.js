import { deleteCookie } from "cookies-next";

export default async function handler(req, res) {
  const token = req.cookies.token || "";
  try {
    console.log(token);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/logout`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    deleteCookie("token", { req, res });
    res.json({ message: "Logout successful", data: response?.data });
  } catch (error) {
    res.status(500).json({
      message: "Logout failed",
      error: error.response?.data || error.message,
    });
  }
}
