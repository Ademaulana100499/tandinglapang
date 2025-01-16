import axios from "axios";

export default async function handler(req, res) {
  const { email, password } = req.body;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    res.status(200).json({
      message: "Login successful",
      data: response.data.data.data,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "Login failed",
      error: error.response ? error.response.data : error.message,
    });
  }
}
