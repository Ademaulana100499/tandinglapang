import { fetchAPI } from "./api";

export const handleRegister = async (registerData) => {
  return await fetchAPI({
    method: "POST",
    url: "/register",
    data: registerData,
  });
};

export const handleLogin = async (a) => {
  return await fetchAPI({
    method: "POST",
    url: "/login",
    data: a,
  });
};
