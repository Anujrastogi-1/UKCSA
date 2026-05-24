import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, SESSION_TTL_SECONDS } from "./sessionConstants";

// JWT helpers (jose) + bcrypt helpers + cookie wiring for the admin session.
//
// Why jose, not jsonwebtoken: jose is maintained, Web-Crypto based, and works
// in both the Node.js and the Edge runtimes — important because Next.js
// middleware runs on the edge.
//
// Why bcryptjs, not bcrypt: bcrypt is a native module and frequently breaks
// on Vercel due to glibc/musl mismatches. bcryptjs is pure JS — slower per
// hash but irrelevant at our auth volume.

const SESSION_COOKIE = SESSION_COOKIE_NAME;

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_SECRET is missing or too short (need ≥ 32 chars). See .env.example."
    );
  }
  return new TextEncoder().encode(secret);
}

// ---------- password hashing -------------------------------------------------

export async function hashPassword(plain: string) {
  // 12 rounds ≈ ~250ms on a typical Vercel function. Tunable.
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

// ---------- JWT --------------------------------------------------------------

export type AdminSessionPayload = {
  sub: string;                  // admin _id
  username: string;
  role: "admin";
  mcp: boolean;                 // mustChangePassword
} & JWTPayload;

export async function signAdminSession(payload: {
  sub: string;
  username: string;
  mustChangePassword: boolean;
}) {
  return new SignJWT({
    username: payload.username,
    role: "admin",
    mcp: payload.mustChangePassword
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecret());
}

export async function verifyAdminSession(
  token: string
): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.role !== "admin" || typeof payload.sub !== "string") return null;
    return payload as AdminSessionPayload;
  } catch {
    return null;
  }
}

// ---------- cookie wiring ----------------------------------------------------

// Used from API route handlers when we own the NextResponse object.
export function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SECONDS
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0
  });
}

// Read the cookie inside Server Components / middleware via next/headers.
export async function readSessionFromCookies(): Promise<AdminSessionPayload | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyAdminSession(token);
}

export { SESSION_COOKIE_NAME } from "./sessionConstants";
