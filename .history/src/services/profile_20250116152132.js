import { fetchAPIWithToken } from "./api";
import { getCookie } from "cookies-next";

export const getProfile = async () => {
  return await fetchAPIWithToken({
    method: "GET",
    url: "/me",
  });
};
