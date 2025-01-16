export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const { data } = await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })
      ).json();
      res.status(200).json({ message: "Login successful", data });
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  }
}
