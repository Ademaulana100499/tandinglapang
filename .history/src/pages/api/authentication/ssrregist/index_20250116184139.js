import axios from "axios";

export default async function handler(req, res) {
  const { email, name, password, c_password, role, phone_number } = req.body;

  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      { email, name, password, c_password, role, phone_number },
      { headers: { "Content-Type": "application/json" } }
    );
    res.status(200).json({ message: "Regist successful", data: data?.data });
  } catch (error) {
    res.status(500).json({
      message: "Regist failed",
      error: error.response?.data || error.message,
    });
  }
}
