import React from "react";
import Link from "next/link";
import useNavbar from "@/hooks/useNavbar";
export const Navbar = () => {
  const { data, loading, token } = useNavbar();
  return (
    <div>
      <div className="flex justify-between bg-red-500">
        <Link href="/">Navbar</Link>
        <Link href="/explore">Explore</Link>
        <button className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
          Hover me
        </button>
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
