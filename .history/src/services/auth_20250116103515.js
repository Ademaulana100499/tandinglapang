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
    const response = await fetch(
      "https://sport-reservation-api-bootcamp.do.dibimbing.id/api/v1/login",
      {
        method: "POST",
        method: "POST",
        url: "/login",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
