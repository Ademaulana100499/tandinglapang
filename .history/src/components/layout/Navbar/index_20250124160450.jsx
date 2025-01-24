import React, { useState, useEffect } from "react";
import Link from "next/link";
import useNavbar from "@/hooks/useNavbar";

export const Navbar = () => {
  const { data, loading, token } = useNavbar();
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 p-5 container mx-auto transition-all duration-300 ${
        scrolling ? "bg-black backdrop-blur-md" : "bg-gray-900"
      } text-white font-contrail`}>
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-red-500 hover:text-white transition duration-300">
          SewaLapang
        </Link>
        <div className="hidden md:flex gap-10">
          <Link
            href="/home"
            className="hover:text-red-500 transition duration-300">
            Home
          </Link>
          <Link
            href="/explore"
            className="hover:text-red-500 transition duration-300">
            Explore
          </Link>
          <Link
            href="/contact"
            className="hover:text-red-500 transition duration-300">
            Contact
          </Link>
        </div>

        {loading ? (
          <p className="text-sm">Loading...</p>
        ) : token ? (
          <Link
            href="/profile"
            className="flex flex-col items-center text-sm hover:text-red-500 transition duration-300">
            <span>{data?.name}</span>
            <p className="text-xs">{data?.role}</p>
          </Link>
        ) : (
          <Link
            href="/login"
            className="hover:text-red-500 transition duration-300">
            Login
          </Link>
        )}

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button className="text-red-500 hover:text-white">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="flex flex-col items-center gap-5 py-5">
          <Link href="/home" className="text-lg hover:text-red-500">
            Home
          </Link>
          <Link href="/explore" className="text-lg hover:text-red-500">
            Explore
          </Link>
          <Link href="/contact" className="text-lg hover:text-red-500">
            Contact
          </Link>
        </div>

        {token ? (
          <Link href="/profile" className="text-center mt-5 hover:text-red-500">
            <span>{data?.name}</span>
            <br />
            <span className="text-sm">{data?.role}</span>
          </Link>
        ) : (
          <Link href="/login" className="text-center mt-5 hover:text-red-500">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
