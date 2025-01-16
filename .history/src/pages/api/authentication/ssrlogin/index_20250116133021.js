import axios from "axios";

export default async function handler(req, res) {
  const { email, password } = req.body;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    // Jika login berhasil, mengirim status 200 dan data yang diterima
    res.status(200).json({
      message: "Login successful",
      data: response.data,
    });
  } catch (error) {
    // Menangani kesalahan, misalnya jika login gagal atau permintaan gagal
    console.error(error);
    res.status(401).json({
      message: "Login failed",
      error: error.response ? error.response.data : error.message,
    });
  }
}
