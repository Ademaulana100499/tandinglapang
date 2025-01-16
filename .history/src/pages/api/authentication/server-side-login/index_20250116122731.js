export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL, // Menggunakan URL dari environment
      {
        method: "POST",
        url:/login,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    res.status(response.ok ? 200 : 401).json({
      message: response.ok ? "Login successful" : "Login failed",
      data,
    });
  }
}
