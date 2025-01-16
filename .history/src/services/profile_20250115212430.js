import { fetchAPIWithToken } from "./api";
import { getCookie } from "cookies-next";

export const getProfile = async () => {
  console.log("testtt");
  return await fetchAPIWithToken({
    method: "GET",
    url: "/me",
    token: getCookie("token"),
  });
};
