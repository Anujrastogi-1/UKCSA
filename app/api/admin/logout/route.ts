import { clearSessionCookie } from "../../../../lib/auth";
import { ok } from "../../../../lib/apiResponse";

export const runtime = "nodejs";

export async function POST() {
  const response = ok({ message: "Signed out." });
  clearSessionCookie(response);
  return response;
}
