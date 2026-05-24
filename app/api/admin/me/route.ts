import { NextRequest } from "next/server";
import { requireAdmin } from "../../../../lib/adminGuard";
import { ok } from "../../../../lib/apiResponse";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  // allowMustChange=true so the dashboard can render the "you must change your
  // password" UI without a 403 redirect loop.
  const result = await requireAdmin(request, { allowMustChange: true });
  if ("response" in result) return result.response;
  const { admin } = result.context;

  return ok({
    admin: {
      id: String(admin!._id),
      username: admin!.username,
      email: admin!.email,
      mustChangePassword: Boolean(admin!.mustChangePassword),
      lastLoginAt: admin!.lastLoginAt ?? null
    }
  });
}
