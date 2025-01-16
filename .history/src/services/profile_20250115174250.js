import { getCookie } from "cookies-next";
import Cookies from "js-cookie";

export const getProfile = async () => {
  const token = getCookie("token"); // Ambil token dari cookie
  if (!token) throw new Error("No token found");
  return await fetchAPI({
    method: "GET",
    url: "/me",
    token,
  });
};
