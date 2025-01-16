import axios from "axios";
import { getCookie } from "cookies-next";

export const fetchAPI = async (options) => {
  return new Promise((resolve, reject) => {
    axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      ...options,
    })
      .then((response) => resolve(response))
      .catch((error) => {
        reject(error);
      });
  });
};
