import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLogout } from "@/hooks/useLogout";
export const Navbar = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    setToken(cookies ? cookies.split("=")[1] : null);
  }, []);
  const handleLogin = () => {
    router.push("/login");
  };
  const { handleButtonLogout } = useLogout();
  return (
    <div className="flex justify-between">
      <h1>Navbar</h1>
      {token ? (
        <button onClick={handleButtonLogout}> Logout</button>
      ) : (
        <button onClick={handleLogin}> Login</button>
      )}
    </div>
  );
};
