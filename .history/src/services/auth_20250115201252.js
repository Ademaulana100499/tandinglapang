import { fetchAPI } from "./api";
import { setCookie } from "cookies-next";

export const handleRegister = async (registerData) => {
  return await fetchAPI({
    method: "POST",
    url: "/register",
    data: registerData,
  });
};

export const handleLogin = async (loginData) => {
  try {
    const response = await fetchAPI({
      method: "POST",
      url: "/login",
      data: loginData,
    });

    if (response.data.token) {
      setCookie("token", response.data.token);
    }

    return response;
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
