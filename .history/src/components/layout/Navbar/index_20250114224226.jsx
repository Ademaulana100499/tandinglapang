import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export const Navbar = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const handleLogin = () => {
    router.push("/login");
  };
  return (
    <div className="flex justify-between">
      <h1>Navbar</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
