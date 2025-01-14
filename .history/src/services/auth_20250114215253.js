import { fetchAPI } from "./api";

export const handleLogin = async (loginData) => {
  return await fetchAPI({
    method: "POST", // Menggunakan POST untuk login
    url: "/login", // Endpoint untuk login
    data: loginData, // Data yang dikirimkan (email dan password)
  });
};
