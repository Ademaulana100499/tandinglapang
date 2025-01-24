import React from "react";
import Link from "next/link";
import useNavbar from "@/hooks/useNavbar";
export const Navbar = () => {
  const { data, loading, token } = useNavbar();
  return (
    <div>
      <div className="flex justify-between bg-red-500">
        <Link href="/">Logo</Link>
        <Link href="/home">Home</Link>
        <Link href="/explore">Explore</Link>
        <Link href="/explore">Contact</Link>

        {loading ? (
          <p>Loading...</p>
        ) : token ? (
          <Link href="/profile">
            {data?.name} <br />
            <p className="text-sm">{data?.role}</p>
          </Link>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </div>
  );
};
