import { fetchAPI } from "./api";

export const handleRegister = async () => {
  return await fetchAPI({
    method: "POST",
    url: "/register",
  });
};

export const handleLogin = async () => {
  return await fetchAPI({
    method: "POST",
    url: "/login",
  });
};
