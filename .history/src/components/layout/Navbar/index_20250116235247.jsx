import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLogout } from "@/hooks/useLogout";
import Link from "next/link";
import axios from "axios";

export const Navbar = () => {
  const [data, setData] = useState(null);
  const router = useRouter();
  const [token, setToken] = useState(null);

  // Fungsi untuk mendapatkan data menggunakan Bearer token
  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`, // Menambahkan Bearer token
        },
      });
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Ambil token dari cookie
  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    setToken(cookies ? cookies.split("=")[1] : null);
  }, []);

  // Panggil getData ketika token berubah
  useEffect(() => {
    if (token) {
      getData();
    }
  }, [token]);

  const handleLogin = () => {
    router.push("/login");
  };

  const { handleButtonLogout } = useLogout();

  return (
    <div className="flex justify-between">
      <h1>Navbar</h1>
      <h1>{data ? data.name : "Loading..."}</h1>
      <Link href="/profile">Profile</Link>
      {token ? (
        <button onClick={handleButtonLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};
