import axios from "axios";

export default async function handler(req, res) {
  try {
    const { email, name, password, c_password, role, phone_number } = req.body;
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      { email, name, password, c_password, role, phone_number },
      { headers: { "Content-Type": "application/json" } }
    );
    res.json({ message: "Regist successful", data: data?.data });
  } catch (error) {
    res.json({
      message: res.data.message,
      error: error.response?.data || error.message,
    });
  }
}
