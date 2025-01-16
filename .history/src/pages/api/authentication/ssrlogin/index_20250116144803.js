import axios from "axios";

export default async function handler(req, res) {
  const { email, password } = req.body;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
  }
}
