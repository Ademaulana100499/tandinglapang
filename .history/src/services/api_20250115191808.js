import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export const fetchAPI = async ({ method, url, data }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Mendapatkan token dari cookie setelah komponen ter-render
    const cookieToken = getCookie("token");
    setToken(cookieToken);
    console.log(cookieToken); // Cek token
  }, []);

  if (!token) {
    // Jika token belum ada, return atau handle error
    console.log("Token belum tersedia.");
    return;
  }

  try {
    const response = await axios({
      method,
      url,
      data,
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: `Bearer ${token}`, // Mengirimkan token di header Authorization
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
