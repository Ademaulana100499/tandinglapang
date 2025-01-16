import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLogout } from "@/hooks/useLogout";
import Link from "next/link";
import axios from "axios";

export const Navbar = () => {
  const [data, setData] = useState(null);
  const token = "242|IV8K2DZYJWo7Ed2zorf1aypeJnOvIcuqTh3seFHcdd9bfa2e";
  const router = useRouter();

  const getData = async (token) => {
    if (!token) return; // Jangan panggil API jika token kosong
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data); // Cek apakah data benar
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    setToken(cookies ? cookies.split("=")[1] : null);
  }, []);

  useEffect(() => {
    if (token) {
      getData(token); // Hanya panggil getData jika token sudah ada
    }
  }, [token]);

  const handleLogin = () => {
    router.push("/login");
  };

  const { handleButtonLogout } = useLogout();

  return (
    <div className="flex justify-between">
      <h1>Navbar</h1>
      {data ? <h1>{data.name}</h1> : <h1>Loading...</h1>}
      <Link href="/profile">Profile</Link>
      {token ? (
        <button onClick={handleButtonLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};
