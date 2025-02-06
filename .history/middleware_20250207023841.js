import { NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import { NextRequest } from "next/server";

export function middleware(req) {
  const token = getCookie("token", { req });
  const email = req.cookies.get("email"); // Mengambil email dari cookie atau header, tergantung penyimpanan yang digunakan
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
  matcher: ["/dashboard", "/explore/*"], // Halaman-halaman yang perlu diperiksa
};
