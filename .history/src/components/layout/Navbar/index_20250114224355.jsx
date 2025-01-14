import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  return (
    <div className="flex justify-between">
      <h1>Navbar</h1>
      {token ? (
        <button
          onClick={handleLogout}
          className="bg-white text-orange-500 font-semibold py-2 px-4 rounded-lg hover:bg-orange-100 transition duration-300">
          Logout
        </button>
      ) : (
        <button onClick={handleLogin}> Login</button>
      )}
    </div>
  );
};
