import axios from "axios";

export const fetchAPI = async (options) => {
  return new Promise((resolve, reject) => {
    axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
        apiKey: process.env.NEXT_PUBLIC_API_KEY || "",
      },
      ...options,
    })
      .then((response) => resolve(response))
      .catch((error) => {
        reject(error);
      });
  });
};
