import { fetchAPI } from "./api";

export const handleRegister = async (registerData) => {
  return await fetchAPI({
    method: "POST",
    url: "/register",
    data: registerData,
  });
};

export const handleLoginSSR = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body); // Cek body request yang diterima di server
    const { email, password } = req.body; // Pastikan data ada di body
    console.log("Received email and password:", { email, password });

    // Proses login
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
    if (response.ok) {
      res.status(200).json({ message: "Login successful", data: data });
    } else {
      res.status(401).json({ message: "Login failed", data: data });
    }
  }
};

export const handleLogout = async () => {
  return await fetchAPI({
    method: "POST",
    url: "/logout",
  });
};
