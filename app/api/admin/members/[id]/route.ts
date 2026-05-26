import { NextRequest } from "next/server";
import { Prisma, $Enums } from "@prisma/client";
import { requireAdmin } from "../../../../../lib/adminGuard";
import { prisma } from "../../../../../lib/db";
import { errors, ok } from "../../../../../lib/apiResponse";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isValidId(id: string) {
  return UUID_RE.test(id);
}

export async function GET(request: NextRequest, ctx: RouteContext) {
  const result = await requireAdmin(request);
  if ("response" in result) return result.response;

  const { id } = await ctx.params;
  if (!isValidId(id)) return errors.badRequest("Invalid id.");

  const member = await prisma.member.findUnique({ where: { id } });
  if (!member) return errors.notFound();

  return ok({
    member: {
      id: member.id,
      membershipType: member.membershipType,
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      phone: member.phone,
      context: member.context,
      subject: member.subject,
      message: member.message,
      status: member.status,
      sheetSynced: member.sheetSynced,
      ipAddress: member.ipAddress,
      userAgent: member.userAgent,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt
    }
  });
}

export async function DELETE(request: NextRequest, ctx: RouteContext) {
  const result = await requireAdmin(request, { requireOrigin: true });
  if ("response" in result) return result.response;

  const { id } = await ctx.params;
  if (!isValidId(id)) return errors.badRequest("Invalid id.");

  try {
    await prisma.member.delete({ where: { id } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return errors.notFound();
    }
    throw err;
  }

  return ok({ message: "Submission deleted." });
}

// Optional status transition (e.g. mark approved). Wire up to your dashboard
// when you build the review workflow.
export async function PATCH(request: NextRequest, ctx: RouteContext) {
  const result = await requireAdmin(request, { requireOrigin: true });
  if ("response" in result) return result.response;

  const { id } = await ctx.params;
  if (!isValidId(id)) return errors.badRequest("Invalid id.");

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errors.badRequest("Malformed JSON request.");
  }
  if (!body || typeof body !== "object") return errors.badRequest();

  const allowed = ["new", "reviewing", "approved", "rejected", "archived"] as const;
  const next = (body as Record<string, unknown>).status;
  if (typeof next !== "string" || !(allowed as readonly string[]).includes(next)) {
    return errors.validation({ status: "Invalid status value." });
  }

  try {
    const updated = await prisma.member.update({
      where: { id },
      data: { status: next as $Enums.MemberStatus }
    });
    return ok({ message: "Status updated.", status: updated.status });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return errors.notFound();
    }
    throw err;
  }
}
