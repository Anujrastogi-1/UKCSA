import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE_NAME } from "./lib/sessionConstants";

// Edge-runtime gate for /admin UI pages. The API routes do their own
// (stronger) checks against Mongo — this layer only avoids rendering the
// dashboard shell for unauthenticated users.
//
// Important: do NOT import any Node-only modules here (mongoose, bcryptjs).
// Proxy runs on the Edge runtime.
//
// File convention: in Next.js 16 the previous `middleware.ts` was renamed
// to `proxy.ts` with the exported function renamed to `proxy`.

const PROTECTED_PREFIX = "/admin";
const LOGIN_PATH = "/admin/login";

function getSecret(): Uint8Array | null {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) return null;
  return new TextEncoder().encode(secret);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page itself and the API surface to pass through; APIs
  // enforce their own auth.
  if (!pathname.startsWith(PROTECTED_PREFIX)) return NextResponse.next();
  if (pathname === LOGIN_PATH || pathname.startsWith("/admin/login/")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const secret = getSecret();
  if (!token || !secret) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "admin") {
      return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    }
    // If the admin still owes a password change, force /admin/password.
    if (payload.mcp === true && pathname !== "/admin/password") {
      return NextResponse.redirect(new URL("/admin/password", request.url));
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }
}

export const config = {
  // Only run on /admin/* paths (excluding _next, static).
  matcher: ["/admin/:path*"]
};
