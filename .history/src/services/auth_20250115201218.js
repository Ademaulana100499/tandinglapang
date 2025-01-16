import { fetchAPI } from "./api";

export const handleRegister = async (registerData) => {
  return await fetchAPI({
    method: "POST",
    url: "/register",
    data: registerData,
  });
};

import { setCookie } from "cookies-next"; // Import setCookie

export const handleLogin = async (loginData) => {
  try {
    const response = await fetchAPI({
      method: "POST",
      url: "/login",
      data: loginData,
    });

    // Jika login berhasil dan ada token, simpan ke cookie
    if (response.data.token) {
      setCookie("token", response.data.token); // Set cookie dengan token
    }

    return response;
  } catch (error) {
    throw error; // Tangani error jika ada
  }
};

export const handleLogout = async () => {
  return await fetchAPI({
    method: "POST",
    url: "/logout",
  });
};
