import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const blogEnabled = process.env.ENABLE_BLOG === "true";
  const isProduction = process.env.NODE_ENV === "production";

  // Block blog routes when blog is disabled
  if (!blogEnabled && request.nextUrl.pathname.startsWith("/thoughts")) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  // Block _dev routes in production (e.g., /thoughts/_dev/*)
  if (isProduction && request.nextUrl.pathname.includes("/thoughts/_")) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
