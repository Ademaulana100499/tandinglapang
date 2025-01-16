import { fetchAPIWithToken } from "./api";

export const getProfile = async () => {
  return await fetchAPIWithToken({
    method: "GET",
    url: "/me",
  });
};
