import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLogout } from "@/hooks/useLogout";
import Link from "next/link";
import axios from "axios";

export const Navbar = () => {
  const [data, setData] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // For loading state
  const router = useRouter();

  const getData = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false once the request is done
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
      getData();
    } else {
      setLoading(false); // If there's no token, stop loading
    }
  }, [token]);

  const handleLogin = () => {
    router.push("/login");
  };

  const { handleButtonLogout } = useLogout();

  return (
    <div className="flex justify-between">
      <h1>Navbar</h1>

      <Link href="/profile">Profile</Link>

      {loading ? (
        <span>Loading...</span> // Show loading message when data is being fetched
      ) : token ? (
        <>
          <span>Welcome, {data ? data.name : "User"}</span>{" "}
          {/* Display user name if available */}
          <button onClick={handleButtonLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};
