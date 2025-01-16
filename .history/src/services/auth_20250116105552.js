import { fetchAPI } from "./api";

export const handleRegister = async (registerData) => {
  return await fetchAPI({
    method: "POST",
    url: "/register",
    data: registerData,
  });
};

export const handleLoginSSR = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await fetchAPI({
      method: "POST",
      url: "/login",
      body: JSON.stringify({
        email,
        password,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ message: "Login successful", data: data });
    } else {
      res.status(401).json({ message: "Login failed", data: data });
    }
  } catch (error) {
    throw error;
  }
};

export const handleLogout = async () => {
  return await fetchAPI({
    method: "POST",
    url: "/logout",
  });
};
