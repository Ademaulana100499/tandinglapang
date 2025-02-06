export function middleware(req) {
  const token = getCookie("token", { req });
  const email = getCookie("email", { req });
  const path = req.nextUrl.pathname;

  console.log("Token:", token);
  console.log("Email:", email);
  console.log("Path:", path);

  if (!token) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (path === "/dashboard" && email && !email.endsWith("@dibimbing.com")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}
