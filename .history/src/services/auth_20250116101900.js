import { fetchAPI } from "./api";

export const handleRegister = async (registerData) => {
  return await fetchAPI({
    method: "POST",
    url: "/register",
    data: registerData,
  });
};

export const handleLoginSSR = async (loginData) => {
  try {
    const response = await fetchAPI({
      method: "POST",
      body: JSON.stringify(loginData),
      url: "/login",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to log in");
    }
    return await response.json();
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
