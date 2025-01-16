import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email, name, password, c_password, role, phone_number } = req.body;
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      { email, name, password, c_password, role, phone_number },
      { headers: { "Content-Type": "application/json" } }
    );
    res.status(200).json({ message: "Regist successful", data });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || "Registration failed",
      error: error.response?.data || error.message,
    });
  }
}
