import { fetchAPI } from "./api";

export const handleLogin = async () => {
  return await fetchAPI({
    method: "POST",
    url: "/login",
  });
};
