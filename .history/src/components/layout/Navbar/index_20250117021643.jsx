import React from "react";
import Link from "next/link";
import useNavbar from "@/hooks/useNavbar";
export const Navbar = () => {
  const { data, loading, token, hiddenPages } = useNavbar();
  return (
    <div className="flex justify-between bg-red-500">
      <h1>Navbar</h1>

      {!isHidden && loading ? (
        <p>Loading...</p>
      ) : token ? (
        <Link href="/profile">{data?.name}</Link>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};
