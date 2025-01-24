import React from "react";
import Link from "next/link";
import useNavbar from "@/hooks/useNavbar";

export const Navbar = () => {
  const { data, loading, token } = useNavbar();

  return (
    <div>
      <div className="flex justify-between bg-green-700 text-white items-center p-4 shadow-lg">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-widest text-yellow-500">
          SportArena
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-10">
          <Link href="/home" className="hover:text-yellow-400">
            Home
          </Link>
          <Link href="/explore" className="hover:text-yellow-400">
            Explore
          </Link>
          <Link href="/contact" className="hover:text-yellow-400">
            Contact
          </Link>
        </div>

        {/* User Authentication */}
        {loading ? (
          <p>Loading...</p>
        ) : token ? (
          <Link
            href="/profile"
            className="flex flex-col items-center text-yellow-400">
            <p>{data?.name}</p>
            <p className="text-sm">{data?.role}</p>
          </Link>
        ) : (
          <Link href="/login" className="text-yellow-400 hover:text-yellow-300">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
