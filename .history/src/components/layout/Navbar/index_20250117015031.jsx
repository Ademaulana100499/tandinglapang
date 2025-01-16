import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { getCookie } from "cookies-next";

export const Navbar = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(getCookie("token")); // Simpan token di state

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", res.data);
      setData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Gagal memuat data. Cek console untuk detail.");
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Token diambil:", token); // Debugging token

    if (token) {
      const delay = setTimeout(() => {
        console.log("Fetching data...");
        getData();
      }, 5000); // Delay 5 detik

      return () => clearTimeout(delay); // Cleanup jika token berubah sebelum timeout selesai
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="flex justify-between bg-red-500">
      <h1>Navbar</h1>

      {loading ? (
        <p>Loading...</p>
      ) : token ? (
        <Link href="/profile">{data?.name}</Link>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};
