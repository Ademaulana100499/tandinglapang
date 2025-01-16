export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const response = await fetch(
      "https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/login",
      {
        method: "POST",
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
