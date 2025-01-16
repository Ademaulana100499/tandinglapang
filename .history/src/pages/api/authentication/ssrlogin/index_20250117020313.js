import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email, password } = req.body;
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    res.status(200).json({ message: "Login successful", data });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || "Login failed",
      error: error.response?.data || error.message,
    });
  }
}
// import axios from "axios";

// export default async function handler(req, res) {
//   try {
//     const { email, password } = req.body;
//     const { data } = await axios.post(
//       `${process.env.NEXT_PUBLIC_API_URL}/login`,
//       { email, password },
//       { headers: { "Content-Type": "application/json" } }
//     );
//     res.status(200).json({ message: "Login successful", data: data?.data });
//   } catch (error) {
//     res.status(500).json({
//       message: "Login failed",
//       error: error.response?.data || error.message,
//     });
//   }
// }
