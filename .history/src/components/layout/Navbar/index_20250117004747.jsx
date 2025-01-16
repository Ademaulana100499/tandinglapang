import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Link from "next/link";
import axios from "axios";
import { getCookie } from "cookies-next";
export const Navbar = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // State untuk loading
  const token = getCookie("token");
  const router = useRouter();

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);
      setData(res.data.data);
      setLoading(false); // Set loading ke false setelah data diterima
    } catch (error) {
      console.log(error);
      setLoading(false); // Jika ada error, set loading false
    }
  };

  useEffect(() => {
    if (token) {
      getData(token);
    } else {
      setLoading(false); // Jika token tidak ada, hentikan loading
    }
  }, [token]);

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex justify-between">
      <h1>Navbar</h1>

      {loading ? (
        <p>Loading...</p> // Menampilkan loading sementara data diambil
      ) : token ? (
        <Link href="/profile">{data?.name}</Link> // Pastikan data ada sebelum diakses
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};
