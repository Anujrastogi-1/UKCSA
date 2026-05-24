import { NextRequest } from "next/server";
import { requireAdmin } from "../../../../lib/adminGuard";
import Admin from "../../../../models/Admin";
import {
  hashPassword,
  signAdminSession,
  setSessionCookie,
  verifyPassword
} from "../../../../lib/auth";
import { errors, ok } from "../../../../lib/apiResponse";

export const runtime = "nodejs";

// Reasonable minimums. Tune for your threat model; this is a small admin
// surface so we prioritize "can be typed by a human" over Argon2-style policy.
const MIN_LENGTH = 12;

function validatePassword(value: string) {
  if (value.length < MIN_LENGTH) {
    return `Password must be at least ${MIN_LENGTH} characters.`;
  }
  if (value.length > 200) return "Password is too long.";
  // Require at least one letter and one digit. Symbols are encouraged, not required.
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
    return "Password must include at least one letter and one digit.";
  }
  return undefined;
}

export async function POST(request: NextRequest) {
  // allowMustChange=true: this endpoint is the ONE place you can call while
  // the flag is set. Origin pinned because it's state-changing.
  const result = await requireAdmin(request, {
    allowMustChange: true,
    requireOrigin: true
  });
  if ("response" in result) return result.response;
  const { admin } = result.context;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errors.badRequest("Malformed JSON request.");
  }
  if (!body || typeof body !== "object") return errors.badRequest();

  const { currentPassword, newPassword } = body as Record<string, unknown>;
  if (typeof currentPassword !== "string" || typeof newPassword !== "string") {
    return errors.badRequest("currentPassword and newPassword are required.");
  }

  const policyErr = validatePassword(newPassword);
  if (policyErr) return errors.validation({ newPassword: policyErr });
  if (currentPassword === newPassword) {
    return errors.validation({ newPassword: "New password must differ from current password." });
  }

  // Re-fetch with the hash included.
  const full = await Admin.findById(admin!._id).select("+passwordHash");
  if (!full) return errors.unauthorized("Session invalid.");

  const ok1 = await verifyPassword(currentPassword, full.passwordHash);
  if (!ok1) return errors.unauthorized("Current password is incorrect.");

  full.passwordHash = await hashPassword(newPassword);
  full.mustChangePassword = false;
  await full.save();

  // Issue a fresh session so the new JWT no longer carries mcp=true.
  const token = await signAdminSession({
    sub: String(full._id),
    username: full.username,
    mustChangePassword: false
  });
  const response = ok({ message: "Password updated." });
  setSessionCookie(response, token);
  return response;
}
