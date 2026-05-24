import { NextRequest } from "next/server";
import { connectDB } from "../../../../lib/db";
import Admin from "../../../../models/Admin";
import { verifyPassword, signAdminSession, setSessionCookie } from "../../../../lib/auth";
import { ensureAdminSeeded } from "../../../../lib/seedAdmin";
import { clientIp, rateLimit } from "../../../../lib/rateLimit";
import { errors, ok } from "../../../../lib/apiResponse";
import { isOriginAllowed } from "../../../../lib/adminGuard";

export const runtime = "nodejs";

// Tight rate limit — credential stuffing prevention. 8 attempts per IP per
// 15 min before lockout. Username-keyed limiter is layered on top to slow down
// distributed attempts against a specific account.
const IP_WINDOW_MS = 15 * 60 * 1000;
const IP_MAX = 8;
const USER_WINDOW_MS = 15 * 60 * 1000;
const USER_MAX = 5;

export async function POST(request: NextRequest) {
  if (!isOriginAllowed(request)) return errors.forbidden("Bad origin.");

  // Bootstrap the first admin from env vars (no-op after the first run).
  try {
    await ensureAdminSeeded();
  } catch (err) {
    console.error("[admin/login] seed failed:", err);
    // We still try to authenticate — if the DB is up but seed had a transient
    // failure, an existing admin can still log in.
  }

  const ip = clientIp(request);
  const ipLimit = rateLimit(ip, { scope: "admin-login-ip", windowMs: IP_WINDOW_MS, max: IP_MAX });
  if (!ipLimit.allowed) {
    return errors.rateLimited("Too many login attempts from your network. Try again later.");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errors.badRequest("Malformed JSON request.");
  }
  if (!body || typeof body !== "object") return errors.badRequest();

  const { username, password } = body as Record<string, unknown>;
  if (typeof username !== "string" || typeof password !== "string" || !username || !password) {
    return errors.badRequest("Username and password are required.");
  }

  const usernameNorm = username.toLowerCase().trim();
  const userLimit = rateLimit(usernameNorm, {
    scope: "admin-login-user",
    windowMs: USER_WINDOW_MS,
    max: USER_MAX
  });
  if (!userLimit.allowed) {
    return errors.rateLimited("Too many attempts for this account. Try again later.");
  }

  await connectDB();
  const admin = await Admin.findOne({ username: usernameNorm }).select("+passwordHash");

  // Generic message on both "no such user" and "wrong password" so we don't
  // leak which accounts exist.
  if (!admin) return errors.unauthorized("Invalid username or password.");
  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) return errors.unauthorized("Invalid username or password.");

  // Update last-login metadata. Failure here must not block login.
  try {
    admin.lastLoginAt = new Date();
    admin.lastLoginIp = ip;
    await admin.save();
  } catch (err) {
    console.warn("[admin/login] failed to update last-login:", err);
  }

  const token = await signAdminSession({
    sub: String(admin._id),
    username: admin.username,
    mustChangePassword: Boolean(admin.mustChangePassword)
  });

  const response = ok({
    admin: {
      id: String(admin._id),
      username: admin.username,
      email: admin.email,
      mustChangePassword: Boolean(admin.mustChangePassword)
    }
  });
  setSessionCookie(response, token);
  return response;
}
