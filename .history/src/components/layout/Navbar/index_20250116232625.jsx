import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLogout } from "@/hooks/useLogout";
import Link from "next/link";

export async function getServerSideProps({ req }) {
  const token = req.cookies.token || "";
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    return { props: { data: res.data.data || [] } };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { props: { data: {} } };
  }
}

export const Navbar = ({ data }) => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    setToken(cookies ? cookies.split("=")[1] : null);
  }, []);
  const handleLogin = () => {
    router.push("/login");
  };
  const { handleButtonLogout } = useLogout();
  return (
    <div className="flex justify-between">
      <h1>{data?.name || "Guest"}</h1>
      <h1>Navbar</h1>
      <Link href="/profile">profile</Link>
      {token ? (
        <button onClick={handleButtonLogout}> Logout</button>
      ) : (
        <button onClick={handleLogin}> Login</button>
      )}
    </div>
  );
};
