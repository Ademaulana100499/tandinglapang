import { fetchAPI } from "./api";
import deleteCookie from "cookies-next";

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
export const handleLogout = async (a) => {
  try {
    const response = await fetchAPI({
      method: "POST",
      url: "/logout",
      data: a,
    });

    // Hapus token dari localStorage jika menggunakan JWT
    deleteCookie("token"); // Atau cookie jika digunakan

    return response;
  } catch (error) {
    throw error;
  }
};
