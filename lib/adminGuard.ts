import { NextRequest } from "next/server";
import type { HydratedDocument } from "mongoose";
import { readSessionFromCookies, type AdminSessionPayload } from "./auth";
import { errors } from "./apiResponse";
import { connectDB } from "./db";
import Admin, { type AdminDoc } from "../models/Admin";

// Use inside any /api/admin/* route to gate access. Returns either the loaded
// admin doc + session, or a NextResponse you should return as-is.

export type AdminContext = {
  session: AdminSessionPayload;
  admin: HydratedDocument<AdminDoc>;
};

type Options = {
  // Allow access even if the admin still has mustChangePassword=true.
  // Use this for /password and /me only — everything else should refuse.
  allowMustChange?: boolean;
  // Require the Origin header to match APP_ORIGIN. Apply to state-changing
  // verbs (POST/PATCH/DELETE) as cheap CSRF defense.
  requireOrigin?: boolean;
};

export async function requireAdmin(
  request: NextRequest,
  options: Options = {}
) {
  if (options.requireOrigin && !isOriginAllowed(request)) {
    return { response: errors.forbidden("Bad origin.") };
  }

  const session = await readSessionFromCookies();
  if (!session) return { response: errors.unauthorized() };

  await connectDB();
  const admin = await Admin.findById(session.sub);
  if (!admin) return { response: errors.unauthorized("Session invalid.") };

  if (admin.mustChangePassword && !options.allowMustChange) {
    return {
      response: errors.forbidden(
        "Password change required before continuing."
      )
    };
  }

  const context: AdminContext = { session, admin };
  return { context };
}

export function isOriginAllowed(request: NextRequest | Request) {
  const expected = process.env.APP_ORIGIN;
  // In dev we don't enforce so localhost ports just work.
  if (!expected || process.env.NODE_ENV !== "production") return true;
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).origin === new URL(expected).origin;
  } catch {
    return false;
  }
}
