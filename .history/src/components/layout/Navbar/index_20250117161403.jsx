import React from "react";
import Link from "next/link";
import useNavbar from "@/hooks/useNavbar";
export const Navbar = () => {
  const { data, loading, token } = useNavbar();
  return (
    <div className="flex justify-between bg-red-500">
      <Link href="/">Navbar</Link>
      <Link href="/explore">Explore</Link>

      {loading ? (
        <p>Loading...</p>
      ) : token ? (
        <Link href="/profile">
          {data?.name} <br />
          {data.role}
        </Link>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};
