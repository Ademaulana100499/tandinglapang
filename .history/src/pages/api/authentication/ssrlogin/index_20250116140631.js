import axios from "axios";

export default async function handler(req, res) {
  const { email, password } = req.body;

  try {
    // Menggunakan axios untuk melakukan POST request
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    // Mengirimkan respons jika login berhasil
    res.status(200).json({
      message: "Login successful",
      data: response.data,
    });
  } catch (error) {
    // Menangani jika ada error saat login
    console.error(error);
    res.status(401).json({
      message: "Login failed",
      error: error.response ? error.response.data : error.message,
    });
  }
}
