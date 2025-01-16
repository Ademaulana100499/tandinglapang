import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Link from "next/link";
import axios from "axios";
import { getCookie } from "cookies-next";
export const Navbar = () => {
  const [data, setData] = useState(null);
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getData(token);
    }
  }, [token]);
  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex justify-between">
      <h1>Navbar</h1>

      {token ? (
        <Link href="/profile">{data.data.name}</Link>
      ) : (
        <button onClick={handleLogin}> Login</button>
      )}
    </div>
  );
};
