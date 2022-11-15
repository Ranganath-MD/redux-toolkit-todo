import { NextResponse } from "next/server";

export const config = {
  matcher: ["/user/:path*"],
};

export async function middleware(req) {
  const token = req.cookies.has("token");

  if (!token) {
    const url = req.nextUrl;
    url.pathname = "/login";
    return NextResponse.redirect(url, req.url);
  }
}
