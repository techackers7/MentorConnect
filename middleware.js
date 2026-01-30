import { NextResponse } from "next/server";

export function middleware(request) {
  if (process.env.NODE_ENV === "development") {
    console.log("Checking path:", request.nextUrl.pathname);
  }

  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/login" ||
    path === "/registration" ||
    path === "/forgotPassword" ||
    path === "/resetPassword"||
    path === "/" ||
    path === "/contact";

  const token = request.cookies.get("token")?.value || "";

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if ((path === "/login" || path === "/registration") && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  return NextResponse.next(); 
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg|.*\\.jpg|.*\\.jpeg).*)",
  ],
};
