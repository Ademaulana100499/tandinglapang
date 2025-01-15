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

export const handleLogout = async () => {
  return await fetchAPI({
    method: "POST",
    url: "/logout", // Sesuaikan endpoint logout jika perlu
  });
};
