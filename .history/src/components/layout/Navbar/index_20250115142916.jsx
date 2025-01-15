import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLogout } from "@/hooks/useLogout";
import { cookies } from "next/headers";
export const Navbar = () => {
  const router = useRouter();
  const token = cookie.getItem("access_token");
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
