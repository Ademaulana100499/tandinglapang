import { NextResponse } from "next/server";
import { getCookie } from "cookies-next";

export function middleware(req) {
  const token = getCookie("token", { req });
  const email = getCookie("email", { req });
  const path = req.nextUrl.pathname;

  if (path === "/dashboard") {
    if (!token) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (!email || !email.endsWith("@dibimbing.com")) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
