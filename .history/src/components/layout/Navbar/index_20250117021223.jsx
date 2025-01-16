import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { getCookie } from "cookies-next";
import useNavbar from "@/hooks/useNavbar";
export const Navbar = () => {
  const { data, loading, token } = useNavbar();
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
