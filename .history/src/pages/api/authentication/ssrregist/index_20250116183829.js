import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, name, password, c_password, role, phone_number } =
        req.body;

      // Validasi input jika diperlukan
      if (
        !email ||
        !name ||
        !password ||
        !c_password ||
        !role ||
        !phone_number
      ) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      if (password !== c_password) {
        return res.status(400).json({
          message: "Passwords do not match",
        });
      }

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        { email, name, password, c_password, role, phone_number },
        { headers: { "Content-Type": "application/json" } }
      );

      return res.status(200).json({
        message: "Registration successful",
        data: data?.data,
      });
    } catch (error) {
      console.error("Registration error:", error);

      return res.status(500).json({
        message: "Registration failed",
        error: error.response?.data || error.message,
      });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
