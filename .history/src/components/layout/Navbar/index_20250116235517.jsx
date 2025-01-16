import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLogout } from "@/hooks/useLogout"; // Asumsi: useLogout adalah custom hook untuk logout
import Link from "next/link";
import axios from "axios";

export const Navbar = () => {
  const [data, setData] = useState(null);
  const router = useRouter();
  const [token, setToken] = useState(null);

  // Fungsi untuk mendapatkan data menggunakan Bearer token
  const getData = async () => {
    if (!token) return; // Tidak melanjutkan jika tidak ada token
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`, // Menambahkan Bearer token
        },
      });
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Menangani error 401 Unauthorized jika token tidak valid
      if (error.response && error.response.status === 401) {
        router.push("/login"); // Redirect ke halaman login jika token tidak valid
      }
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

  const { handleButtonLogout } = useLogout(); // Custom hook untuk logout

  const handleLogout = () => {
    handleButtonLogout(); // Fungsi untuk menghapus token atau melakukan logout
    setData(null); // Reset data setelah logout
    router.push("/login"); // Redirect ke halaman login setelah logout
  };

  return (
    <div className="flex justify-between">
      <h1>Navbar</h1>
      <div>{data ? <h2>Welcome, {data.name}</h2> : <h2>Loading...</h2>}</div>
      <Link href="/profile">Profile</Link>
      {token ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};
