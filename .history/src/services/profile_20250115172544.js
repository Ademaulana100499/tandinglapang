import { fetchAPI } from "./api";

export const getProfile = async () => {
  return await fetchAPI({
    method: "GET",
    url: "/me",
  });
};
