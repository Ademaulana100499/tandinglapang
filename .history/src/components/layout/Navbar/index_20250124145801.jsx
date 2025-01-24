import React from "react";
import Link from "next/link";
import useNavbar from "@/hooks/useNavbar";

export const Navbar = () => {
  const { data, loading, token } = useNavbar();

  return (
    <div className="flex justify-between items-center bg-[#2D3A3A] p-4 rounded-lg shadow-lg">
      <Link
        href="/"
        className="text-2xl font-bold text-[#FFD700] hover:text-[#FF6347]">
        Navbar
      </Link>
      <Link
        href="/explore"
        className="text-lg font-semibold text-white py-2 px-4 rounded-lg hover:bg-[#FF6347] transition">
        Explore
      </Link>

      {loading ? (
        <p className="text-[#FFD700]">Loading...</p>
      ) : token ? (
        <Link href="/profile" className="text-white hover:text-[#FF6347]">
          <span className="text-lg font-bold">{data?.name}</span> <br />
          <p className="text-sm text-[#CCCCCC]">{data?.role}</p>
        </Link>
      ) : (
        <Link
          href="/login"
          className="text-lg font-semibold text-white py-2 px-4 rounded-lg hover:bg-[#FF6347] transition">
          Login
        </Link>
      )}
    </div>
  );
};
