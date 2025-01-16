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
    const { email, password } = req.body;
    console.log({ email, password });
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
