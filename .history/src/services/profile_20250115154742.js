import { fetchAPI } from "./api";

export const handleProfile = async () => {
  return await fetchAPI({
    method: "GET",
    url: "/me",
  });
};
