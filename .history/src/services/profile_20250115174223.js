import Cookies from "js-cookie";

export const getProfile = async () => {
  const token = Cookies.get("token"); // Ambil token dari cookie
  if (!token) throw new Error("No token found");
  return await fetchAPI({
    method: "GET",
    url: "/me",
    token,
  });
};
