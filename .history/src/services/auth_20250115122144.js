import { deleteCookie } from "cookies-next";
import { fetchAPI } from "./api";

export const handleRegister = async (registerData) => {
  return await fetchAPI({
    method: "POST",
    url: "/register",
    data: registerData,
  });
};

export const handleLogin = async (loginData) => {
  return await fetchAPI({
    method: "POST",
    url: "/login",
    data: loginData,
  });
};

// auth.js
export const handleLogout = async () => {
  try {
    const response = await fetchAPI({
      method: "POST",
      url: "/logout",
    });

    // Hapus token dari localStorage jika menggunakan JWT
    deleteCookie("token"); // Atau cookie jika digunakan

    return response;
  } catch (error) {
    throw error;
  }
};
