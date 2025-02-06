import { NextResponse } from "next/server";
import { getCookie } from "cookies-next";

export function middleware(req) {
  const token = getCookie("token", { req }); // Ambil token
  const email = getCookie("email", { req }); // Ambil email menggunakan getCookie
  const path = req.nextUrl.pathname;

  // Jika tidak ada token, redirect ke halaman unauthorized
  if (!token) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // Cek apakah akses ke dashboard sesuai dengan email
  if (path === "/dashboard" && email && !email.endsWith("@dibimbing.com")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/protected/*"], // Halaman yang perlu diperiksa
};
