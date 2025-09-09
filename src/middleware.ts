import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { publicRoutes, authRoutes, apiAuthPrefix } from "./routes";
import { NextResponse } from "next/server";
import getCurrentUser from "./lib/auth";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;


  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);  

  if (isApiRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  const user = await getCurrentUser();
  const userRole = user?.role;

  if(nextUrl.pathname.startsWith("/mahasiswa") && userRole !== "MAHASISWA") {
    return NextResponse.redirect(new URL("/dosen", nextUrl))
  }
  if(nextUrl.pathname.startsWith("/dosen") && userRole !== "DOSEN") {
    return NextResponse.redirect(new URL("/mahasiswa", nextUrl))
  }


});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
