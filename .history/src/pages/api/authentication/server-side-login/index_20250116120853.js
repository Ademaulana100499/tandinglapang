import { fetchAPI } from "./api";
export default async function handler(req, res) {
  if (req.method === "POST") {
    // read body
    const { email, password } = req.body;

    console.log({ email, password });
    const response = await fetchAPI({
      method: "POST",
      url: "/login",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ message: "Login successful", data: data });
    } else {
      res.status(401).json({ message: "Login failed", data: data });
    }
  }
}
