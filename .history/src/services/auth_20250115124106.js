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
  try {
    const response = await fetchAPI({
      method: "POST",
      url: "/logout",
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Logout failed");
    }
  } catch (error) {
    throw new Error("Logout failed: " + error.message);
  }
};
